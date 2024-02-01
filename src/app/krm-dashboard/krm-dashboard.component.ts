import { Component, OnInit } from '@angular/core';
import { CountService } from '../service/master/count.service';
import { Chart } from 'chart.js/auto';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-krm-dashboard',
  templateUrl: './krm-dashboard.component.html',
  styleUrls: ['./krm-dashboard.component.css']
})
export class KrmDashboardComponent implements OnInit {
  public resolved: boolean = false;

  filter: boolean = false
  isOc: boolean = false
  isFsb: boolean = false
  public loaddata: any;
  searchtext: any;
  currentPage: number = 0
  krmData: any
  krmList: any[] = []
  dataFilter: any = []
  deskripsi: any = 'Loading..';
  area: any
  section: any
  sectionData: any = []
  sectionFiltered: any = []
  sectionShow: boolean = false
  closeSuccessAlert() {

  }
  constructor(private service: CountService, private spinner: NgxSpinnerService) { }

  filterButton() {
    this.filter = !this.filter
  }
  uniqueSections = new Set<string>();
  areaFilter() {
    this.section = ''
    this.krmList = []
    this.sectionData = []
    this.sectionFiltered = []
    this.sectionShow = true
    this.service.getKrmData().subscribe(data => {
      this.dataFilter = data
      this.dataFilter.forEach((element: any) => {
        if (element.id_area == this.area) {
          this.krmList.push(element)
        }
      });

      if (this.area == 1 || this.area == 2) {
        this.isOc = true
      } else {
        this.isOc = false
      }


      this.service.getPrAllSection().subscribe(data => {
        this.sectionData = data
        //////////console.log(this.area + ' hah');

        this.sectionData.forEach((element: any) => {
          //////////console.log('sini si');
          //////////console.log(element.id_area);

          if (element.id_area == this.area) {
            this.sectionFiltered.push(element)
          }
        });

        // Assuming this.sectionFiltered is your array of data

      })

      this.spinner.hide()
      this.resolved = true
    })

  }

  sectionFilter() {
    this.krmList = []
    console.log(this.section);
    this.service.getKrmData().subscribe(data => {
      this.dataFilter = data
      this.dataFilter.forEach((element: any) => {
        if (element.section == this.section && element.id_area == this.area) {
          this.krmList.push(element)
        }
      });

      //////////console.log(this.prData);

      this.spinner.hide()
      this.resolved = true
    })

  }

  resetFilter() {
    this.area = ''
    this.section = ''
    this.filter  = false
    this.krmList = []
    this.service.getKrmData().subscribe(data => {
      this.krmData = data
      this.krmData.forEach((element: any) => {
        this.krmList.push(element)
      });
      console.log(this.krmList);

      this.spinner.hide()
      this.resolved = true
    }
    );

  }

  async ngOnInit(): Promise<void> {
    window.scrollTo(0, 0);
    this.loaddata = new Promise(resolve => {
      this.service.getKrmData().subscribe(data => {
        this.krmData = data
        this.krmData.forEach((element: any) => {
          this.krmList.push(element)
        });
        console.log(this.krmList);

        this.spinner.hide()
        this.resolved = true
      }
      );

    });
    this.spinner.show();
    this.loaddata = await this.loaddata;
  }
};
