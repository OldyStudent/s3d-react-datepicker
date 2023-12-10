# React DatePicker Component

A React implementation of the jQuery UI DateTimePicker plugin.

## Overview

DatePicker is a React component for selecting dates, inspired by the jQuery UI DateTimePicker plugin. It provides a user-friendly interface for choosing dates with various configuration options.

## Features

- Interactive calendar for date selection.
- Month and year dropdowns for easy navigation.
- Customizable date format and language/locale.
- Support for minimum and maximum selectable dates.
- Right-to-left display option.
- Callback function for handling date changes.

## Installation

To install the DatePicker component in your React project, use the following command:

```bash
npm install s3d-react-datepicker
```

## Usage
Import the DatePicker component into your React application:

```jsx
import DatePicker from 's3d-react-datepicker';
```
Use the component in your JSX:

```jsx
const YourComponent = () => {
    return (
        <div>
            <h1>My App</h1>
            <DatePicker />
        </div>
    );
};
```

## Props

| Name       | Type            | Required | Description                                                                                                                                                                                        |
|------------|-----------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`       | string          | No       | The `id` property is a string representing the identifier associated with the Datepicker. It can be useful when associating the Datepicker with a label, particularly for the `htmlFor` attribute. |
| `name`     | string          | No       | The `name` property represents the name associated with the input field. This is useful in a form to associate the field and its value during submission.                                          |
| `options`  | object          | No       | The `options` property is an object allowing configuration of specific Datepicker options. All options are optional.                                                                               |
| `onChange` | function        | No       | The `onChange` prop is a callback function triggered whenever a new date is selected in the DatePicker component. <br/>```onChange: (selectedDate: Moment &vert; null) => void;```                 |
| `ref`      | React.RefObject | No       | The `ref` property is a React reference object, providing direct access to the Datepicker instance. This can be used to access functions exposed by the component.                                 |

### Examples

```jsx
// Basic usage without optional props
<Datepicker />

// Using the optional 'name' prop for form association
<Datepicker name="eventDate" />

// Associating 'id' for accessibility with a label
<label htmlFor="birthdate">Birthdate :</label>
<Datepicker id="birthdate" />

// Providing 'options' for custom configuration
<Datepicker options={{ format: 'DD/MM/YYYY' }} />

// Using 'ref' to access Datepicker functions programmatically
const datepickerRef = useRef();
<Datepicker ref={datepickerRef}

// Using the 'onChange' prop to log the selected date to the console
<DatePicker onChange={(date) => {console.log('Selected date:', date?.format('DD/MM/YYYY'));}}/>
```

## Exposed Functions

The `Datepicker` component exposes the following functions through the `ref` prop :

- `resetDatePicker()` : Resets the date picker to its initial state.


## Options

The options prop allows you to configure the behavior of the DateTimePicker component. Here are some key options:

| Option           | Description                                                 | Default Value |
|------------------|-------------------------------------------------------------|---------------|
| `datepicker`     | Enable or disable the datepicker functionality.             | true          |
| `dayOfWeekStart` | Set the starting day of the week (0-6, Sunday to Saturday). | 0             |
| `defaultDate`    | Set the default selected date.                              | false         |
| `format`         | The date and time format to display.                        | "YYYY-MM-DD"  |
| `lang`           | Set the language/locale for the component.                  | "en"          |
| `maxDate`        | Set the maximum selectable date.                            | false         |
| `minDate`        | Set the minimum selectable date.                            | false         |
| `rtl`            | Enable or disable right-to-left layout.                     | false         |
| `styles`         | Customize the appearance of the DatePicker.                 | {}            |
| `yearEnd`        | Set the end year for the year dropdown.                     | 2050          |
| `yearStart`      | Set the start year for the year dropdown.                   | 1950          |



## Style Customization

The `DatePicker` component provides flexibility in customizing its appearance through the `styles` option. You can customize different parts of the DatePicker component using either of the following approaches:

1. Using CSS Class

    You can provide the name of a CSS class to override or add new styles. 

2. Using Object Style

   Alternatively, you can provide an object containing specific CSS properties to apply styles directly. This allows you to define individual styles for different elements of the DatePicker.

### Available Style Options

| Variable              | Description                                                                | 
|-----------------------|----------------------------------------------------------------------------|
| `inputField`          | Custom style for the date input field.                                     |
| `datepickerContainer` | Custom style for the overall DatePicker wrapper.                           | 
| `navigationSection`   | Custom style for the navigation section, including month change buttons.   | 
| `dropdownContainer`   | Custom style for the month and year dropdown container.                    | 
| `weekdaysHeader`      | Custom style for the section containing the names of the days of the week. | 
| `daysGrid`            | Custom style for the grid containing the numbers of the days in the month. |


#### Note : 

The class name approach can be used to easily redefine specific CSS variables within the `datepickerContainer`. The following variables can be overridden


| Variable                            | Description                         | Default Value  |
|-------------------------------------|-------------------------------------|----------------|
| `--s3d-dp--color-background`        | Background color of the DatePicker. | white          |
| `--s3d-dp--color-calendar-grid`     | Color of the calendar grid.         | #d9d9d9        |
| `--s3d-dp--color-cell-hover`        | Color when a cell is hovered.       | orange         |
| `--s3d-dp--color-current-day`       | Color of the current selected day.  | cornflowerblue |
| `--s3d-dp--color-disabled-cell`     | Color of disabled cells.            | #9f9f9f        |
| `--s3d-dp--color-disabled-cell-bg`  | Background color of disabled cells. | gray           |
| `--s3d-dp--color-other-day`         | Color of days in other months.      | #9f9f9f        |
| `--s3d-dp--color-other-weekend`     | Color of weekends in other months.  | #323232        |
| `--s3d-dp--color-scroll-bar`        | Color of the scroll bar.            | #646464        |
| `--s3d-dp--color-text`              | Default text color.                 | black          |
| `--s3d-dp--font-size`               | Default font size.                  | 12px           |
| `--s3d-dp--color-nav-button`        | Default navigation button color.    | #9f9f9f        |
| `--s3d-dp--color-nav-button--hover` | Navigation button color on hover.   | black          |


### Example for Style Customization

To customize the style of the DatePicker, you can pass an object of `styles` as part of the options :


```css
   /* custom.css file */
   .custom-datepickerContainer {
       /* override DatePicker variable */
       --s3d-dp--color-background: #f0f0f0;
       border-radius: 10px;       
   }
   
   .custom-menu-dropdown-style {
       padding: 10px;
   }
   
    /* ... other custom styles ... */
```

```jsx
import "./custom.css";
import React, { useRef } from "react";
import DatePicker from "s3d-react-datepicker";

const App = () => {
    
    const customStyles = {
        inputField: { height: 40 },
        datepickerContainer: "custom-datepickerContainer",
        navigationSection: { background: "lightblue" },
        dropdownContainer: "custom-menu-dropdown-style",
        weekdaysHeader: { fontWeight: "bold" },
        daysGrid: { color: "green" },
    };

    return (
        <div>
            <h1>My App</h1>
            <DatePicker options={{ styles: customStyles }} />
        </div>
    );
};

export default App;

```

## License
This DateTimePicker component is open-source and available under the MIT License.
