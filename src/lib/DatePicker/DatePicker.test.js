import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DatePicker from "./DatePicker";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("DatePicker", () => {
  it("Affiche un élément input", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("Affiche le datepicker lorsqu'on clique sur l'input", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");

    fireEvent.click(input);

    const datepicker = screen.getByRole("dialog");
    expect(datepicker).toBeInTheDocument();
  });

  it("Cache le datepicker lorsqu'on reclique sur l'input", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");

    fireEvent.click(input);

    let datepicker = screen.getByRole("dialog");
    expect(datepicker).toBeInTheDocument();

    fireEvent.click(input);

    datepicker = screen.getByRole("dialog");
    expect(datepicker).toHaveClass("hidden");
  });

  it("Cache le datepicker lorsqu'on clique à l'exterieur du composant", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");

    fireEvent.click(input);

    let datepicker = screen.getByRole("dialog");
    expect(datepicker).toBeInTheDocument();

    fireEvent.click(document.body);

    datepicker = screen.getByRole("dialog");
    expect(datepicker).toHaveClass("hidden");
  });

  it("Sélectionne une date dans le calendrier", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");

    fireEvent.click(input);

    // Choisissez une cellule de calendrier pour la sélection
    const calendarCell = screen.getByText("15"); // Assurez-vous que la date est présente dans le calendrier
    fireEvent.click(calendarCell);

    // Vérifiez si la valeur de l'input a été mise à jour
    expect(input).toHaveValue("2023-12-15");
    expect(screen.queryByRole("dialog")).toHaveClass("hidden");

    fireEvent.click(input);

    // Choisissez une cellule de calendrier pour la sélection
    const calendarCell2 = screen.getByText("16"); // Assurez-vous que la date est présente dans le calendrier
    fireEvent.click(calendarCell2);

    // Vérifiez si la valeur de l'input a été mise à jour
    expect(input).toHaveValue("2023-12-16");
    expect(screen.queryByRole("dialog")).toHaveClass("hidden");
  });

  it("Change le mois et l'année dans le datepicker", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");

    fireEvent.click(input);

    // Choisissez le menu déroulant du mois et changez le mois
    const monthDropdown = screen.getAllByRole("listbox")[0];
    fireEvent.click(monthDropdown);

    const anotherMonth = screen.getByText("May");
    fireEvent.click(anotherMonth);

    expect(monthDropdown).toHaveTextContent("May");

    const yearDropdown = screen.getAllByRole("listbox")[1];
    fireEvent.click(yearDropdown);

    const anotherYear = screen.getByText("1958");
    fireEvent.click(anotherYear);

    expect(yearDropdown).toHaveTextContent("1958");
  });

  test("Interaction avec le DatePicker", () => {
    render(<DatePicker name="datePicker" id="datePicker" />);

    const input = screen.getByRole("textbox");
    const datePickerContainer = screen.getByRole("dialog");

    fireEvent.click(input);

    const selectedDate = screen.getByText("15");
    fireEvent.click(selectedDate);

    expect(input).toHaveValue("2023-12-15");
    expect(datePickerContainer).toHaveClass("hidden");

    fireEvent.click(input);
    fireEvent.click(selectedDate);

    expect(input).toHaveValue("2023-12-15");

    const differentDate = screen.getByText("20");
    fireEvent.click(differentDate);

    expect(input).toHaveValue("2023-12-20");
    expect(datePickerContainer).toHaveClass("hidden");
  });

  it("Réinitialise le datepicker à la date du jour", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");

    fireEvent.click(input);
    expect(input).toHaveValue("");
    // Sélectionnez une date dans le calendrier
    const calendarCell = screen.getByText("15");
    fireEvent.click(calendarCell);

    expect(input).toHaveValue("2023-12-15");
    // Réinitialisez le datepicker
    const resetButton = screen.getByLabelText("Reset to current date");
    fireEvent.click(resetButton);

    // Vérifiez si le datepicker est réinitialisé à l'état initial
    expect(input).toHaveValue(moment().format("YYYY-MM-DD"));
    expect(screen.queryByRole("dialog")).toHaveClass("hidden");
  });

  it("Passe aux mois suivant et precedents", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");
    fireEvent.click(input);

    const monthDropdown = screen.getAllByRole("listbox")[0];
    expect(monthDropdown).toHaveTextContent("December");

    const nextMonthBtn = screen.getByLabelText("Next month");
    fireEvent.click(nextMonthBtn);
    expect(monthDropdown).toHaveTextContent("January");

    const previousMonthBtn = screen.getByLabelText("Previous month");
    fireEvent.click(previousMonthBtn);
    fireEvent.click(previousMonthBtn);

    expect(monthDropdown).toHaveTextContent("November");
  });

  it("N'accepte pas les dates invalides dans l'input", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "invalid date" } });
    fireEvent.blur(input);
    expect(input.value).toBe("");
  });

  it("Efface la date sélectionnée lorsqu'on vide l'input", () => {
    render(<DatePicker />);
    const input = screen.getByRole("textbox");

    fireEvent.click(input);
    const calendarCell = screen.getByText("15");
    fireEvent.click(calendarCell);

    expect(input).toHaveValue("2023-12-15");
    fireEvent.change(input, { target: { value: "" } });
    expect(input).toHaveValue("");
  });

  it("Empêche la sélection des dates inférieures à la `minDate`", () => {
    render(<DatePicker options={{ minDate: "2023-12-15" }} />);
    const input = screen.getByRole("textbox");
    fireEvent.click(input);

    const calendarCell = screen.getByText("14");
    fireEvent.click(calendarCell);

    expect(input).toHaveValue("");
  });

  it("Empêche la sélection des dates supérieures à la `maxDate`", () => {
    render(<DatePicker options={{ maxDate: "2023-12-15" }} />);
    const input = screen.getByRole("textbox");
    fireEvent.click(input);

    const calendarCell = screen.getByText("16");
    fireEvent.click(calendarCell);

    expect(input).toHaveValue("");
  });

  it("Pré-sélectionne une date spécifique", () => {
    const selectedDate = moment("1985-10-26");

    render(<DatePicker options={{ defaultDate: selectedDate }} />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("1985-10-26");
    expect(screen.getByText("26")).toHaveClass("selected-cell");
  });

  it("Permet de saisir les dates dans un format différent", () => {
    const format = "MM/YYYY/DD";
    render(<DatePicker options={{ format, defaultDate: "12/2023/31" }} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("12/2023/31");
  });

  it("Formate les dates saisies dans un format différent", () => {
    const format = "DD/MM/YYYY";
    render(<DatePicker options={{ format }} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "2023/12/31" } });
    fireEvent.blur(input);
    expect(input).toHaveValue(moment().format(format));
  });

  it("Réinitialise le DatePicker avec le ref", async () => {
    const datePickerRef = React.createRef();
    render(<DatePicker ref={datePickerRef} />);
    const input = screen.getByRole("textbox");

    fireEvent.click(input);
    const calendarCell = screen.getByText("15");
    fireEvent.click(calendarCell);

    expect(input).toHaveValue("2023-12-15");

    await waitFor(() => {
      datePickerRef.current.resetDatePicker();
      expect(input).toHaveValue("");
    });
    expect(screen.queryByRole("dialog")).toHaveClass("hidden");
  });

  it("Cache correctement le DatePicker lorsqu'`options.datepicker` est false", () => {
    render(<DatePicker options={{ datepicker: false }} />);
    const input = screen.getByRole("textbox");
    fireEvent.click(input);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Réagit correctement aux changements d'options", () => {
    const { rerender } = render(<DatePicker options={{ lang: "en" }} />);
    const input = screen.getByRole("textbox");

    fireEvent.click(input);

    expect(screen.getByText("Sun")).toBeTruthy();

    rerender(<DatePicker options={{ lang: "fr" }} />);
    expect(screen.getByText("Dim")).toBeTruthy();
  });

  it("Change correctement le mois en mode RTL", () => {
    const { rerender } = render(<DatePicker options={{ rtl: false }} />);
    let input = screen.getByRole("textbox");

    fireEvent.click(input);

    expect(screen.getAllByRole("button")[0]).toHaveAttribute(
      "aria-label",
      "Previous month",
    );

    rerender(<DatePicker options={{ rtl: true }} />);
    input = screen.getByRole("textbox");
    fireEvent.click(input);

    expect(screen.getAllByRole("button")[0]).toHaveAttribute(
      "aria-label",
      "Next month",
    );
  });

  test("calls onChange when the selected date changes", () => {
    const mockOnChange = jest.fn();

    render(<DatePicker onChange={mockOnChange} />);

    const input = screen.getByRole("textbox");

    fireEvent.click(input);
    const calendarCell = screen.getByText("15");
    fireEvent.click(calendarCell);

    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test("Saisie de date au clavier", () => {
    render(<DatePicker />);

    const input = screen.getByRole("textbox");

    act(() => {
      userEvent.type(input, "2023-12-10");
      fireEvent.blur(input);
    });

    expect(input).toHaveValue("2023-12-10");

    act(() => {
      userEvent.type(input, "/fsdfsdfsd21@/");
      fireEvent.blur(input);
    });

    expect(input).toHaveValue("2023-12-10");
  });

  test("Saisie de date au clavier avec validation par Enter", () => {
    render(<DatePicker />);

    const input = screen.getByRole("textbox");
    const datePickerContainer = screen.getByRole("dialog");

    act(() => {
      userEvent.type(input, "2023-12-10");
      fireEvent.keyDown(input, { key: "Enter" });

      expect(input).toHaveValue("2023-12-10");
      expect(datePickerContainer).toHaveClass("hidden");
    });
  });
});
