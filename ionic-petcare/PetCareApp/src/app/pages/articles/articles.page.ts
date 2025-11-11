import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Needed for ion-searchbar and ion-segment [(ngModel)]

// Import the Data Service
import { DataService } from 'src/app/services/data.service';

// Define an interface for type safety (assuming article structure)
interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
  standalone: true,
  // Import necessary modules for Ionic components, NgIf/NgFor, and forms
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule // Allows using [(ngModel)] for search/filter
  ],
})
export class ArticlesPage implements OnInit {

  private allArticles: Article[] = []; // Stores the full list of articles
  public filteredArticles: Article[] = []; // List displayed to the user
  public articleCategories: string[] = ['All', 'Health', 'Training', 'Nutrition', 'Tips'];
  
  public searchTerm: string = '';
  public selectedCategory: string = 'All';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadArticles();
  }

  /**
   * Fetches the dummy article data from the DataService.
   */
  loadArticles() {
    // Note: You must ensure DataService has a method that returns an array of Article objects.
    this.allArticles = this.dataService.getArticles(); 
    this.applyFilters(); // Display all articles initially
  }

  /**
   * Called when the search term or category filter changes.
   */
  applyFilters() {
    let tempArticles = this.allArticles;

    // 1. Filter by Category
    if (this.selectedCategory !== 'All') {
      tempArticles = tempArticles.filter(
        article => article.category === this.selectedCategory
      );
    }

    // 2. Filter by Search Term (Title or Excerpt)
    if (this.searchTerm.trim() !== '') {
      const lowerCaseSearch = this.searchTerm.toLowerCase();
      tempArticles = tempArticles.filter(
        article => 
          article.title.toLowerCase().includes(lowerCaseSearch) ||
          article.excerpt.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    this.filteredArticles = tempArticles;
  }

  /**
   * Resets the search term and applies filters.
   */
  onSearchClear() {
    this.searchTerm = '';
    this.applyFilters();
  }
  
  /**
   * Navigates to a specific article detail page.
   * @param article The selected article.
   */
  viewArticle(article: Article) {
    console.log('Navigating to article details:', article.title);
    // In a full app, you would use the Angular Router here:
    // this.router.navigate(['/articles', article.id]);
  }
}