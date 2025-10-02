import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';


export interface PlanetElement {
    description: string;
    distInMillionsKM: {
        fromSun: number,
        fromEarth: number
    },
    id: number;
    imageName: number;
    imageURL: string;
    planetColor: string,
    planetName: string,
    planetRadiusKM: number
}


const ELEMENT_DATA: PlanetElement[] = [];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [
        MatButtonModule, MatTableModule, MatSortModule, CommonModule
    ],
})
export class AppComponent implements AfterViewInit {
    planetsData: any;

    constructor(private http: HttpClient) { }

    private _liveAnnouncer = inject(LiveAnnouncer);

    displayedColumns: string[] = ['planetName', 'color', 'planetRadiusKM', 'distFromSun', 'distFromEarth'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    @ViewChild(MatSort) sort: MatSort = new MatSort;

    ngOnInit(): void {
        // Make the API call here
        this.http.get('http://localhost:3001/api/planets').subscribe(
            (response) => {
                this.planetsData = response; // Assign the response to a component property
                this.dataSource = new MatTableDataSource(this.planetsData);
                console.log('API Response:', this.planetsData);
            },
            (error) => {
                console.error('API Error:', error);
            }
        );
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    announceSortChange(sortState: Sort) {
        console.log("sort")
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
