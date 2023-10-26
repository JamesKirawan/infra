import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { User } from 'app/main/user/model/user.viewmodel';
import { UserService } from 'app/main/user/service/user.service';
import { AlertService } from 'app/shared/service/alert/alert.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductComment } from './models/comment.viewmodel';
import { CommentService } from './service/comment.service';

@Component({
  selector: 'app-comment-content',
  templateUrl: './comment-content.component.html'
})
export class CommentContentComponent implements OnInit, OnDestroy, AfterViewInit {
  // Decorator
  @Input() productId: any;
  @ViewChild('scrollMe') scrollMe: ElementRef;
  scrolltop: number = null;
  
  // Public
  public activeChat: Boolean;
  public comments: ProductComment[] = [];
  public commentText: any;
  public env = environment
  public currSkin = '';
  public user: User;
  private newComment = new ProductComment();
  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   *
   * @param {CommentService} _commentService
   */
  constructor(
    private _commentService: CommentService,
    private _userService: UserService,
    private _coreConfigService: CoreConfigService,
    private _alertService: AlertService,
    private _activatedRoute: ActivatedRoute
    ) {
      this._unsubscribeAll = new Subject();
      this._coreConfigService
      .getConfig()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(config => {
        this.currSkin = config.layout.skin;
      });
      this.user = this._userService.currentUserValue
    }

  get userId(){
    return this.user.userId || null
  }
  
  addComment(): void {
    if(this.userId){
      this.newComment.commentText = this.commentText
      this._commentService.addComment(this.newComment).subscribe((resp) => {
        if(resp?.result){
          resp.result['user'] = this._userService.currentUserValue
          this.comments.push(resp.result)
        }
      },(err) => {
        console.log(err)
      }).add(() => {
        this.commentText = ''
        setTimeout(() => {
          this.scrolltop = this.scrollMe?.nativeElement.scrollHeight;
        }, 0);
      })
    }
    else{
      this._alertService.toastrError('Error','Please login to authenticate!',2000,'center');
    }
  }

  async deleteComment(commentId: number){
    try {
      const status: any = await this._commentService.deleteComment(commentId)
      if(status.message) {
        const idx = this.comments.findIndex(c => c.commentId === commentId)
        this.comments.splice(idx,1);
      }
    } catch(e) {
      this._alertService.Global_Alert('error','Error',e)
    }
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngAfterViewInit(): void {
    this.scrolltop = this.scrollMe?.nativeElement.scrollHeight;
  }

  ngOnInit(): void {
    this.productId = this.productId ||  parseInt(this._activatedRoute.snapshot.params['id']);
    this._commentService.getAllComment(this.productId)
    this._commentService.onCommentChange.pipe(takeUntil(this._unsubscribeAll)).subscribe((resp) => {
      this.comments = resp
    })
    this.newComment.userId = this.userId
    this.newComment.productId = this.productId
  }

  ngOnDestroy(): void {
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

}
