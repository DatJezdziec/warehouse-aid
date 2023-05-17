// Import the necessary modules
import { Component } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { saveAs } from 'file-saver';

// Define the component metadata
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// Define the component class
export class AppComponent {
  // Define the input element and the button element
  input: HTMLInputElement;
  button: HTMLButtonElement;

  // Define the table element and the header row
  table: HTMLTableElement;
  header: HTMLTableSectionElement;
  headerRow: HTMLTableRowElement;
  headerCell: HTMLTableCellElement;

  // Define the csv records array
  csvRecords: any[] = [];

  // Inject the ngxCsvParser service
  constructor(private ngxCsvParser: NgxCsvParser) {}

  // Initialize the component elements and event listeners
  ngOnInit() {
    // Get the input element and the button element by id
    this.input = document.getElementById("input") as HTMLInputElement;
    this.button = document.getElementById("button") as HTMLButtonElement;

    // Get the table element and create a header row
    this.table = document.getElementById("table") as HTMLTableElement;
    this.header = this.table.createTHead();
    this.headerRow = this.header.insertRow(0);
    this.headerCell = this.headerRow.insertCell(0);
    this.headerCell.innerHTML = "Text";

    // Add an event listener to the button to call the addTextToTable function on click
    this.button.addEventListener("click", () => this.addTextToTable());
  }

  // Define a function to add the input text to the table
  addTextToTable() {
    // Get the input value and trim any whitespace
    let text = this.input.value.trim();
    // Check if the input is not empty
    if (text) {
      // Create a new row and a cell in the table body
      let row = this.table.insertRow(-1);
      let cell = row.insertCell(0);
      // Set the cell content to the input value
      cell.innerHTML = text;
      // Clear the input value
      this.input.value = "";
    }
  }

  // Define a function to export the table to CSV
  exportTableToCSV(filename: string) {
    // Initialize an array to store the CSV rows
    let csv = [];
    // Loop through the table rows
    let rows = this.table.rows;
    for (let i = 0; i < rows.length; i++) {
      // Initialize an array to store the row cells
      let row = [];
      // Loop through the row cells
      let cells = rows[i].cells;
      for (let j = 0; j < cells.length; j++) {
        // Push the cell text to the row array, escaping any commas
        row.push(cells[j].innerText.replace(/,/g, "\\,"));
      }
      // Push the row array to the CSV array, joining by comma
      csv.push(row.join(","));
    }
    // Create a blob object from the CSV array, specifying the MIME type
    let csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
    // Save the blob object as a file using file-saver module
    saveAs(csvFile, filename);
  }

  // Define a function to handle file change event
  fileChangeListener($event: any) {
    // Get the files from the event object
    const files = $event.srcElement.files;

    // Parse the file using ngxCsvParser service
    this.ngxCsvParser.parse(files[0], { header: true, delimiter: "," })
      .subscribe((result: Array<any>) => {
        console.log("Result", result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log("Error", error);
      });
  }
}
