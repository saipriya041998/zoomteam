import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
dispplay_article:string="https://e79b9811.ngrok.io/api/KB/GetArticles?getall=0&categ=";
add_article:string="https://e79b9811.ngrok.io/api/KB/InsertUpdateKBAricles";
update:string="https://e79b9811.ngrok.io/api/KB/InsertUpdateKBAricles";
article_by_id:string="https://e79b9811.ngrok.io/api/KB/GetKBArticlesById?ArticleId=";
readmore:string="https://e79b9811.ngrok.io/api/KB/GetReadArticle?ArticleId="

  constructor(private _http:HttpClient) { }
  getAllkbArticles(){
    return this._http.get(this.dispplay_article);
  }
  addArticle(item){
    console.log(item);
    console.log('inside service')
    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.add_article,body,{headers:head});
  }
  getArticleById(article_id){
    return this._http.get(this.article_by_id+article_id);
  }
  updateArticle(item){
    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.update,body,{headers:head});
  }
  onReadArticle(article_id){
    return this._http.get(this.readmore+article_id);
  }
}
