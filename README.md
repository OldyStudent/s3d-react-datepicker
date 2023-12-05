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

```javascript
import DatePicker from 's3d-react-datepicker';
```
Use the component in your JSX:

```javascript
const YourComponent = () => {
    return (
        <div>
            <h1>Your Application</h1>
            <DatePicker options={{ /* Your options here */ }} />
        </div>
    );
};
```

## Options
The options prop allows you to configure the behavior of the DateTimePicker component. Here are some key options:

| Option         | Description                                                 | Default Value |
|----------------|-------------------------------------------------------------|---------------|
| datepicker     | Enable or disable the datepicker functionality.             | true          |
| dayOfWeekStart | Set the starting day of the week (0-6, Sunday to Saturday). | 0             |
| defaultDate    | Set the default selected date.                              | false         |
| format         | The date and time format to display.                        | "YYYY-MM-DD"  |
| lang           | Set the language/locale for the component.                  | "en"          |
| maxDate        | Set the maximum selectable date.                            | false         |
| minDate        | Set the minimum selectable date.                            | false         |
| rtl            | Enable or disable right-to-left layout.                     | false         |
| yearEnd        | Set the end year for the year dropdown.                     | 2050          |
| yearStart      | Set the start year for the year dropdown.                   | 1950          |
| onChange       | Callback function triggered on date selection.              | null          |


## Examples
Here's an example of using the DateTimePicker component with some common configurations:

```javascript
const YourComponent = () => {
    const dateTimePickerOptions = {
        format: 'DD/MM/YYYY',
        startDate: '01/02/2023',
        // ... other options
    };

    return (
        <div>
            <h1>Your Application</h1>
            <DateTimePicker name="dateTimePicker" id="exampleDateTimePicker" options={dateTimePickerOptions} />
        </div>
    );
}
```


## License
This DateTimePicker component is open-source and available under the MIT License.