import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSidebarComponent } from './sample-sidebar.component';

describe('SampleSidebarComponent', () => {
    let component: SampleSidebarComponent;
    let fixture: ComponentFixture<SampleSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SampleSidebarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SampleSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});