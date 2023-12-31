import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountService } from '../../../service/master/count.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.component.html',
  styleUrls: ['./pr-list.component.css']
})
export class PrListComponent implements OnInit {

  filter: boolean = false
  isOc: boolean = false
  isFsb: boolean = false
  sectionList : any
  area: any
  section : any
  resolved: boolean = false
  sectionShow : boolean = false
  sectionData : any =[]
  sectionFiltered : any = []
  searchText: any
  prData: any = []
  dataFilter: any = []
  idDelete: any
  successAlert: boolean = false
  deleteAlert: boolean = false
  imagePopUp: boolean = false
  imageUrl: any
  prDataArray: any = []
  itemsPerPage: number = 0;
  math = Math;
  currentPage: number = 1;
  absoluteIndex(indexOnPage: number): number {
    return this.itemsPerPage * (this.currentPage - 1) + indexOnPage;
  }

  constructor(
    private service: CountService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  filterButton() {
    this.filter = !this.filter
    //console.log(this.filter);
   
  }

  areaFilter(){
    this.section = ''
    this.prData = []   
    this.sectionData = []
    this.sectionFiltered = []
    this.sectionShow = true
      this.service.getPrAllData().subscribe(data => {
        this.dataFilter = data
        this.dataFilter.forEach((element : any) => {
          if(element.area == this.area){
            this.prData.push(element)
          }
        });

        if(this.area == 1 || this.area == 2){
          this.isOc = true
        }else{
          this.isOc = false
        }
        
        //console.log(this.prData);

        this.service.getPrAllSection().subscribe(data => {
          this.sectionData = data
          //console.log(this.area + ' hah');
          
          this.sectionData.forEach((element : any) => {
            //console.log('sini si');
            //console.log(element.id_area);
            
            if(element.id_area == this.area){
              this.sectionFiltered.push(element)
            }
          });
          
          //console.log(this.sectionFiltered);
          
          
          
        })
        
        this.spinner.hide()
        this.resolved = true
      })
    
  }

  sectionFilter(){
    this.prData = []   
    //console.log(this.section);
    this.service.getPrAllData().subscribe(data => {
      this.dataFilter = data
      this.dataFilter.forEach((element : any) => {
        if(element.section == this.section && element.area == this.area){
          this.prData.push(element)
        }
      });
      
      //console.log(this.prData);
      
      this.spinner.hide()
      this.resolved = true
    })
    // this.isOc = false
    // this.prData = []   
    // this.sectionData = []
    // this.sectionFiltered = []
    //   this.service.getPrAllData().subscribe(data => {
    //     this.dataFilter = data
    //     this.dataFilter.forEach((element : any) => {
    //       if(element.area == this.area){
    //         this.prData.push(element)
    //       }
    //     });

    //     if(this.area == 1 || this.area == 2){
    //       this.isOc = true
    //     }
        
    //     //console.log(this.prData);

    //     this.service.getPrAllSection().subscribe(data => {
    //       this.sectionData = data
    //       //console.log(this.area + ' hah');
          
    //       this.sectionData.forEach((element : any) => {
    //         //console.log('sini si');
    //         //console.log(element.id_area);
            
    //         if(element.id_area == this.area){
    //           this.sectionFiltered.push(element)
    //         }
    //       });
          
    //       //console.log(this.sectionFiltered);
          
          
          
    //     })
        
    //     this.spinner.hide()
    //     this.resolved = true
      // })
    
  }

  popUp(url: any) {
    this.imagePopUp = !this.imagePopUp
    this.imageUrl = url
    //////console.log(this.imageUrl);

  }

  cancelPopUp() {
    this.imagePopUp = !this.imagePopUp
  }

  oke() {
    this.successAlert = !this.successAlert
    history.replaceState({ ...history.state, successAlert: null }, '');
    //////console.log(history.state);
  }

  delete(id: any) {
    this.idDelete = 0
    this.idDelete = id
    this.deleteAlert = !this.deleteAlert
  }

  okeDelete() {
    this.spinner.show()
    this.resolved = false
    this.service.deletePrData(this.idDelete).subscribe((data: any) => {
      this.ngOnInit()
    })
    this.spinner.hide()
    this.resolved = true
    this.deleteAlert = !this.deleteAlert
  }
  cancelDelete() {
    this.deleteAlert = !this.deleteAlert
  }

  navigateUpdate(idData: any) {
    this.router.navigateByUrl('/pr_update', { state: { id: idData }, })
  }

  ngOnInit() {
    this.spinner.show()
    //////console.log(history.state);
    this.successAlert = history.state.successAlert
    this.service.getPrAllData().subscribe(data => {
      this.prData = data
      //////console.log(this.prData);
      this.spinner.hide()
      this.resolved = true
    })

    
    // //console.log(this.sectionData);
    

  }

}
