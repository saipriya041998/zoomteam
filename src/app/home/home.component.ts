import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Kbarticle } from './kbarticle';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arr:Kbarticle[]=[];
  all_articles:Kbarticle[]=[];
  kb:FormGroup;
  updatedid:any;
  arrbyid:Kbarticle[]=[];
  all_arrbyid:Kbarticle[]=[];
  article_id:any;
  arr1:Kbarticle[]=[];
  article_id1:any;
  closeResult: string;


  constructor(private _data:ArticleService,private fb:FormBuilder,private modalService:NgbModal,private act:ActivatedRoute) { }

  ngOnInit() {

    console.log(this.article_id);
    this.kb=this.fb.group({
      articleId: new FormControl(),
      articleName: new FormControl(),
      content: new FormControl(),
      previewContent: new FormControl(),
      categoryId: new FormControl(),
      categoryName: new FormControl(),
      createdBy: new FormControl(),
      createdByName: new FormControl(),
      createdDate: new FormControl(),
      modifiedBy:new FormControl(),
      modifiedByName:new FormControl(),
      modifiedDate:new FormControl()
    });

    this._data.getAllkbArticles().subscribe(
      (data:Kbarticle[])=>{
        this.arr=data;
        console.log(this.arr);
        this.all_articles=this.arr['kbArticles'];
        console.log(this.all_articles);
      }
    );

    // this.getArticleByIds(this.article_id);
  }
  openAddPopup(Addpopup){
    // if(this.kb.value.articleName!=''){
    //   this.kb.value.articleId='';
    //   this.kb.value.articleName='';
    //   this.kb.value.content='';
    //   this.kb.value.previewContent='';
    //   this.kb.value.categoryId='';
    //   this.kb.value.categoryName='';
    //   this.kb.value.createdBy='';
    //   this.kb.value.createdByName='';
    //   this.kb.value.createdDate='';
    //   this.kb.value.modifiedBy='';
    //   this.kb.value.modifiedByName='';
    //   this.kb.value.modifiedDate='';
    // }

    // this.modalservices.open(Addpopup,{
    //   size:"lg"
    // });

      this.modalService.open(Addpopup, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
    } else {
    return `with: ${reason}`;
    }
    }
  ArticleSave(){
    console.log('inside add ts')
    this._data.addArticle(
      new Kbarticle(
        this.kb.value.articleId,
        this.kb.value.articleName,
        this.kb.value.content,
        this.kb.value.previewContent,
        this.kb.value.categoryId,
        this.kb.value.categoryName,
        this.kb.value.createdBy,
        this.kb.value.createdByName,
        this.kb.value.createdDate,
        this.kb.value.modifiedBy,
        this.kb.value.modifiedByName,
        this.kb.value.modifiedDate
    )
    ).subscribe(
     (x:any)=>{
        alert("Added successfully");
        this.modalService.dismissAll();
      }
    );
    console.log('completed');

  }
  // getArticleByIds(item){
  //   this._data.getArticleById(item).subscribe(
  //     (data:Kbarticle[])=>{
  //       this.arrbyid=data;
  //       console.log(this.arrbyid);
  //       this.all_arrbyid=this.arrbyid['kbArticles'];
  //       console.log(this.all_arrbyid);

  //     }
  //   );
  // }
  openEditPopup(Editpopup,item){

    // this.updatedid=article_id;
    // console.log(this.updatedid);
    //  this.article_id1=this.updatedid.articleId;
    //  console.log(this.article_id1);

    this.kb.patchValue({
      articleId:this.all_articles[item].articleId,
      articleName:this.all_articles[item].articleName,
      content:this.all_articles[item].content,
      previewContent:this.all_articles[item].previewContent,
      categoryId:this.all_articles[item].categoryId,
      categoryName:this.all_articles[item].categoryName,
      createdBy:this.all_articles[item].createdBy,
      createdByName:this.all_articles[item].createdByName,
      createdDate:this.all_articles[item].createdDate,
      modifiedBy:this.all_articles[item].modifiedBy,
      modifiedByName:this.all_articles[item].modifiedByName,
      modifiedDate:this.all_articles[item].modifiedDate
    });
    this.modalService.open(Editpopup,{
      size:"lg"
    });
}
UpdateArticles(){

      this._data.updateArticle(this.updatedid.articleId).subscribe(
        (x:any)=>{
          alert('updated successfully')
        }
      );
    }
onReadMore(Readmore,item){
  this.modalService.open(Readmore,{
        size:"lg"
  });
      this._data.onReadArticle(item).subscribe();
}







}


