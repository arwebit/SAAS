import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopComponent } from './top/top.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { BottomComponent } from './bottom/bottom.component';

@NgModule({
  declarations: [],
  imports: [TopComponent, SidemenuComponent, BottomComponent, CommonModule],
  exports: [TopComponent, SidemenuComponent, BottomComponent],
})
export class LayoutsModule {}
