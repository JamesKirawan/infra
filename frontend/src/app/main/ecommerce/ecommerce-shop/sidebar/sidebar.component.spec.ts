import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceSidebarComponent } from './sidebar.component';

describe('EcommerceSidebarComponent', () => {
    let component: EcommerceSidebarComponent;
    let fixture: ComponentFixture<EcommerceSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EcommerceSidebarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EcommerceSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});