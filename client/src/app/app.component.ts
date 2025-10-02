import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';;
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

export interface PlanetElement {
    description: string;
    distInMillionsKM: {
        fromSun: number,
        fromEarth: number
    },
    id: number;
    imageName: number;
    imageUrl: string;
    planetColor: string,
    planetName: string,
    planetRadiusKM: number
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [
        MatButtonModule, MatTableModule, MatSortModule, CommonModule, MatIconModule, MatCardModule
    ],
})
export class AppComponent implements AfterViewInit {
    @ViewChild(MatSort) sort: MatSort = new MatSort;
    dataSource = new MatTableDataSource<PlanetElement>();
    displayedColumns: string[] = ['planetName', 'color', 'planetRadiusKM', 'fromSun', 'fromEarth'];
    view: string = 'table';
    
    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get<PlanetElement[]>('http://localhost:3001/api/planets').subscribe(
            (response) => {
                this.dataSource.data = response;
                console.log('API Response:', response);
            },
            (error) => {
                console.error('API Error:', error);
            }
        );
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
