import { Component, Input, Renderer2 } from '@angular/core';
import { Post } from '../../../models/post';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  //to access info from the parent in which we render this into
  @Input({required:true}) post:Post = new Post({})


}
