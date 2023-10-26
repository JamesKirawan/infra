import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceDetailsComponent } from './ecommerce-details.component';

describe('EcommerceDetailsComponent', () => {
    let component: EcommerceDetailsComponent;
    let fixture: ComponentFixture<EcommerceDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EcommerceDetailsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EcommerceDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});