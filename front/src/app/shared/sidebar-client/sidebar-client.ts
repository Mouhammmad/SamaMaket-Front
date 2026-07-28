import { Component } from '@angular/core';
import { ClientSectionService } from '../../core/services/client-section';
@Component({
  selector: 'app-sidebar-client',
  standalone: true,
  templateUrl: './sidebar-client.html',
  styleUrl: './sidebar-client.css'
})
export class SidebarClient {

  constructor(
  private sectionService: ClientSectionService
) {}

changerSection(section: string): void {

  this.sectionService.changeSection(section);

}

}