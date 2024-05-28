import { Component, TemplateRef } from '@angular/core';

import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.scss'
})
export class OffcanvasComponent {

  constructor(
		config: NgbOffcanvasConfig,
		private offcanvasService: NgbOffcanvas,
	) {
		config.panelClass='bg-success'
	}

	open(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' });
	}

}
