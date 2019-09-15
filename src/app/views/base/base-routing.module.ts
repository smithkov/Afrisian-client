import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CardsComponent } from "./cards.component";
import { FormsComponent } from "./forms.component";
import { ShopComponent } from "./shop.component";
//category component begins
import { CategoryComponent } from "./category/category.component";
import { CategoryListComponent } from "./categoryList/categoryList.component";
import { CategoryDetailComponent } from "./categoryDetail/categoryDetail.component";
//category component ends
//sub-category component begins
import { SubCategoryComponent } from "./subCategory/subCategory.component";
import { SubCategoryListComponent } from "./subCategoryList/subCategoryList.component";
import { SubCategoryDetailComponent } from "./subCategoryDetail/subCategoryDetail.component";
//sub-category component ends
//product components begins
import { ProductComponent } from "./productAdd/product.component";
import { ProductListComponent } from "./productList/productList.component";
import { ProductDetailComponent } from "./productDetail/productDetail.component";
//product components ends
import { SwitchesComponent } from "./switches.component";
import { TablesComponent } from "./tables.component";
import { TabsComponent } from "./tabs.component";
import { CarouselsComponent } from "./carousels.component";
import { CollapsesComponent } from "./collapses.component";
import { PaginationsComponent } from "./paginations.component";
import { PopoversComponent } from "./popovers.component";
import { ProgressComponent } from "./progress.component";
import { TooltipsComponent } from "./tooltips.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Base"
    },
    children: [
      {
        path: "",
        redirectTo: "cards"
      },
      {
        path: "cards",
        component: CardsComponent,
        data: {
          title: "Cards"
        }
      },
      {
        path: "forms",
        component: FormsComponent,
        data: {
          title: "Forms"
        }
      },
      {
        path: "shop",
        component: ShopComponent,
        data: {
          title: "Shop"
        }
      },
      {
        path: "category",
        component: CategoryComponent,
        data: {
          title: "Category"
        }
      },
      {
        path: "sub-category",
        component: SubCategoryComponent,
        data: {
          title: "Sub Category"
        }
      },
      {
        path: "sub-category-list",
        component: SubCategoryListComponent,
        data: {
          title: "Sub Category List"
        }
      },
      {
        path: "sub-category-detail/:id",
        component: SubCategoryDetailComponent,
        data: {
          title: "Sub Category Detail"
        }
      },
      {
        path: "product-Detail/:id",
        component: ProductDetailComponent,
        data: {
          title: "Product Details"
        }
      },
      {
        path: "category-Detail/:id",
        component: CategoryDetailComponent,
        data: {
          title: "Category Details"
        }
      },
      {
        path: "product-list",
        component: ProductListComponent,
        data: {
          title: "Product list"
        }
      },
      {
        path: "category-list",
        component: CategoryListComponent,
        data: {
          title: "Category list"
        }
      },
      {
        path: "product",
        component: ProductComponent,
        data: {
          title: "product"
        }
      },
      {
        path: "switches",
        component: SwitchesComponent,
        data: {
          title: "Switches"
        }
      },
      {
        path: "tables",
        component: TablesComponent,
        data: {
          title: "Tables"
        }
      },
      {
        path: "tabs",
        component: TabsComponent,
        data: {
          title: "Tabs"
        }
      },
      {
        path: "carousels",
        component: CarouselsComponent,
        data: {
          title: "Carousels"
        }
      },
      {
        path: "collapses",
        component: CollapsesComponent,
        data: {
          title: "Collapses"
        }
      },
      {
        path: "paginations",
        component: PaginationsComponent,
        data: {
          title: "Pagination"
        }
      },
      {
        path: "popovers",
        component: PopoversComponent,
        data: {
          title: "Popover"
        }
      },
      {
        path: "progress",
        component: ProgressComponent,
        data: {
          title: "Progress"
        }
      },
      {
        path: "tooltips",
        component: TooltipsComponent,
        data: {
          title: "Tooltips"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
