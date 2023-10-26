import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceItemComponent } from './ecommerce-item.component';

describe('EcommerceItemComponent', () => {
    let component: EcommerceItemComponent;
    let fixture: ComponentFixture<EcommerceItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EcommerceItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EcommerceItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});