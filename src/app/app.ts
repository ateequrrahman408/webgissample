import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from '../components/header/header'
import { Sidebar } from '../components/sidebar/sidebar';
import { Viewmap } from '../components/viewmap/viewmap';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Sidebar,Viewmap],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('majidapp');
}
