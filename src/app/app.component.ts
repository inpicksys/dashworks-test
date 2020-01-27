import { Component } from '@angular/core';
import { VideoService, VideoEntity } from './shared/video.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { GridOptions, Module } from 'ag-grid-community';
import { MatCheckboxComponent } from './mat-checkbox/mat-checkbox.component';
import { MatInputComponent } from './mat-input/mat-input.component';
import { MatRadioComponent } from './mat-radio/mat-radio.component';
import { MatSelectComponent } from './mat-select/mat-select.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashworks-test';
  videos: VideoEntity[];
  columnDefs = [
    {
      headerName: 'Title', field: 'title',
      cellRenderer: function (params) {
        const url = `https://www.youtube.com/watch?v=${params.data.id}`;
        return '<a href="' + url + '" target="_blank">' + params.value + '</a>'
      }
    },

    { headerName: 'Description', field: 'description' },
    {
      headerName: '', field: 'thumbnails',
      cellRenderer: function (params) {
        let style = `width: ${params.data.thumbnails.width}px; height: ${params.data.thumbnails.height}px`;
        return '<img src="' + params.data.thumbnails.url + '" style="' + style + '" />';
      }
    },
    { headerName: 'Published on', field: 'publishedAt' },

  ];

  rowData: any;
  private sideBar;
  private frameworkComponents;

  private rowSelection;
  private defaultColDef;
  private gridApi;
  private gridColumnApi;
  private icons;
  public gridOptions: GridOptions;

  constructor(private videoService: VideoService) {


    this.defaultColDef = {
      headerCheckboxSelection: isFirstColumn,
      checkboxSelection: isFirstColumn,
      resizable: false,
      filter: true
    };
    //this.defaultColDef = { filter: true };
    this.icons = { "custom-stats": '<span class="ag-icon ag-icon-custom-stats"></span>' };
    this.rowSelection = "multiple";

    this.sideBar = {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel"
        },
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel"
        },
        {
          id: "custom-toolbar",
          labelDefault: "Custom Stats",
          labelKey: "customStats",
          iconKey: "custom-stats",
          toolPanel: "toolbar"
        }
      ],
      defaultToolPanel: "toolbar"
    };
    this.frameworkComponents = { toolbar: ToolbarComponent };

    this.gridOptions = <GridOptions>{
      rowData: this.rowData,
      columnDefs: this.columnDefs,
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      rowHeight: 48, // recommended row height for material design data grids,
      frameworkComponents: {
        checkboxRenderer: MatCheckboxComponent,
        inputRenderer: MatInputComponent,
        radioEditor: MatRadioComponent,
        selectEditor: MatSelectComponent
      }
    };
  }

  private loadData() {
    this.videoService.getList2("john").subscribe((response: any) => {
      if (response.items) {

        this.videos = this.videoService.extractVideoList(response.items);
        this.rowData = this.videos;
      }
    });
  }
  ngOnInit() {
    this.loadData();
  }
  onGridReady(params) {
    this.loadData();
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


}

function isFirstColumn(params) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}