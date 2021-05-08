import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import { getAllCategoriesReq } from 'src/app/core/store/actions';
import { AppState } from '../../../core/store/app.reducers';
import { getAllSubCategoriesReq, getAllBrandsReq } from '../../../core/store/actions/masterdata.actions';
import { Subscription } from 'rxjs';
import { Category } from '../../../core/models/response/category.model';
import { Brand } from '../../../core/models/response/brand.model';
import { SubCategory } from '../../../core/models/response/subcategory.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'shop-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() visible: boolean;
  @Output() close = new EventEmitter<boolean>();
  @Output() filterValues = new EventEmitter<any>();

  public filtersForm: FormGroup;
  public categories: Category[] = [];
  private subcategories: SubCategory[] = [];
  public dep_subcategories: SubCategory[];
  public brands: Brand[] = [];
  public rangeValues: number[] = [1, 20];

  private masterdataSubs: Subscription;
  private categoryValueSubs: Subscription;
  private priceRangeValueSubs: Subscription;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.filtersForm = this.fb.group({
      category: [''],
      dep_subcategory: [''],
      brand: [''],
      priceRange: [[1, 20]]
    })
  }

  ngOnInit(): void {
    this.store.dispatch(getAllCategoriesReq());
    this.store.dispatch(getAllSubCategoriesReq());
    this.store.dispatch(getAllBrandsReq());
  }

  ngAfterViewInit(): void {
    this.masterdataSubs = this.store.select('masterdata').subscribe(({ categories, subcategories, brands }) => {
      this.categories = categories;
      this.subcategories = subcategories;
      this.brands = brands;
    });

    this.categoryValueSubs = this.filtersForm.controls['category'].valueChanges.subscribe(value => {
      this.dep_subcategories = [];
      this.dep_subcategories = this.subcategories.filter(x => x.idCategory == value.idCategory);
    });

    this.priceRangeValueSubs = this.filtersForm.controls['priceRange'].valueChanges.subscribe(value => {
      this.rangeValues = [value[0], value[1]];
    });
  }

  ngOnDestroy(): void {
    this.masterdataSubs?.unsubscribe();
    this.categoryValueSubs?.unsubscribe();
    this.priceRangeValueSubs?.unsubscribe();
  }

  onFilter(): void {
    const { category, dep_subcategory, brand, priceRange } = this.filtersForm.value;

    let values = {
      categoria: category,
      subcategoria: dep_subcategory,
      marca: brand,
      precio: priceRange
    }

    this.visible = false;
    this.filterValues.emit(values);
    this.close.emit(false);
  }

  resetFilters(): void {
    this.filtersForm.patchValue({
      category: '',
      dep_subcategory: '',
      brand: '',
      priceRange: [1, 20]
    });

    let values = {
      categoria: '',
      subcategoria: '',
      marca: '',
      precio: [1, 20]
    }

    this.filterValues.emit(values);
  }

  onCloseFilters(): void {
    this.close.emit(false);
  }
}
