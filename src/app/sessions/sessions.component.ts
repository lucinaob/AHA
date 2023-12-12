import { Component,ViewChild } from '@angular/core';
import{Sessions} from  '../model';
import {SessionsService} from '../_services/sessions.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {MatTableDataSource} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectChange } from '@angular/material/select';
import {Chart} from 'chart.js/auto';
@UntilDestroy()

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {
  public years : number[]=[0];
  chart: any;
  titlechart:any;
  constructor(
    protected SessionsService: SessionsService,
  ) {
    for (let i = 2023; i >1883; i--) {
      this.years.push(i);
    }

  }
  show: boolean=true;
  chartsDisplayed: boolean=false;
  sessionID: number=1;
  endpoint: any;
  sessionSummary: Sessions[] = [];
  panelOpenState = true;
  displayedColumns: string[] = ['paper', 'topic', 'affiliated_societies'];
  dataSource = new MatTableDataSource<Sessions>();
  selectedYear: number = 0;
  selectedType: string='Any';
  selectedTopic : string='Any';
  selectedTitle :string ='';
  selectedPaper :string ='';
  Type:string[]=['Keynote','Panel','Paper Presentation','Other','Any']
  topics: string[] = [
    'Any',
    'Global',
    'Teaching',
    'African American',
    'Historiography',
    'Historiography/Historical Theory and Method',
    'Identity',
    'Transnational',
    'Atlantic',
    'Atlantic World',
    'Ethnicity',
    'Race',
    'Race and Ethnicity',
    'Empire',
    'Education',
    'Gender',
    'Public',
    'Nationalism',
    'Colonialism',
    'Environment',
    'Environmental',
    'World/Global',
    'Political',
    'African Diaspora',
    'Citizenship/Nationalism/National Identity',
    'Labor',
    'Social',
    'War',
    'Capitalism',
    'Immigration',
    'Women',
    'Borderlands',
    'Medicine',
    'Medicine/Disease/Public Health',
    'Science',
    'Social Movement',
    'Digital',
    'Comparative',
    'Archives',
    'Cultural',
    'Military',
    'Iberian World',
    'Slavery',
    'Imperialism',
    'Religion',
    'Technology',
    'Crime and Violence',
    'Foreign Policy',
    'LGBTQ',
    'Urban',
    'Diplomatic',
    'Diplomatic/International',
    'Diasporas',
    'Catholicism',
    'Popular Culture/Mass Culture',
    'Agrarian/Rural',
    'Indigenous',
    'Jewish',
    'Print Culture/History of the Book',
    'Legal',
    'Publishing',
    'Sexuality',
    'Archaeology',
    'Asian American',
    'Feminism',
    'Intellectual',
    'Maritime',
    'Material Culture',
    'Modernity',
    'World War II',
    'Business',
    'Christianity',
    'Economic',
    'Economic/Business',
    'Childhood and Youth',
    'Poli-Econ',
    'Revolution',
    'Biography',
    'Chicano(a)/Latino(a)',
    'Cold War',
    'Disability',
    'Emotions/Senses',
    'Ethnohistory',
    'Indian Ocean World',
    'Peace and Conflict',
    'Profession',
    'Historic Sites',
    'Postcolonial',
    'Subaltern',
    'Visual Materials',
    'Arts',
    'Civil War',
    'Class',
    'Computing',
    'Consumption',
    'Diaspora Studies',
    'Exhibition(s)',
    'Exploration',
    'Family',
    'Film',
    'Film/Media/Photography',
    'Food and Foodways',
    'Gay/Lesbian/LGBTQ',
    'Graduate Studies',
    'Historical Methods',
    'Historical Organization(s)',
    'Holocaust',
    'Islam',
    'Job Market',
    'Language',
    'Mediterranean',
    'Mediterranean World',
    'Memory',
    'Memory Studies',
    'Museums',
    'Music',
    'Native American',
    'Objects/Material Culture',
    'Oral',
    'Pacific World',
    'Protestantism',
    'Quantification',
    'Rural/Agricultural',
    'Science and Technology',
    'Travel/Tourism',
    'World History',
  ];
  
  filteredSessions: Sessions[] = [];

  fold(){
    this.show = !this.show;
  }
  search(){
    this.chartsDisplayed=true;
    this.filteredSessions = this.sessionSummary.filter(session => 
      (this.selectedYear == session.year || this.selectedYear == 0) &&
      (this.selectedType == session.type || this.selectedType == 'Any') &&
      (session.topic.includes(this.selectedTopic) || this.selectedTopic == 'Any') &&
      (session.title.toLowerCase().includes(this.selectedTitle) || this.selectedTopic == '') &&
      (session.paper.toLowerCase().includes(this.selectedPaper) || this.selectedPaper == '')
    );
    this.Chart();
    this.TitleChart();
  }

  yearChange(event: MatSelectChange): void {
    this.selectedYear = event.value;
    this.search();
  }

  typeChange(event: MatSelectChange): void {
    this.selectedType = event.value;
    this.search();
  }

  topicChange(event: MatSelectChange): void {
    this.selectedTopic = event.value;
    this.search();
  }
  
  fetchApiResponse() {
    try {
      const data = this.SessionsService.getSessionSummary(this.sessionID).pipe(untilDestroyed(this)).subscribe((data: any) => {
        this.endpoint = data.endpoint;
        this.sessionSummary = data.apiResponse;
        this.dataSource = new MatTableDataSource(this.sessionSummary);
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  Chart(){
    
    const topicsCount: { [key: string]: number } = {};
  
    // Count the occurrences of each topic
    this.filteredSessions.forEach(session => {
      for (const topic of session.topic.split(/,\s|\//)){
        if (topic in topicsCount) {
          topicsCount[topic]++;
        } else {
          topicsCount[topic] = 1;
        }
      }
      
    });
    
    // Extract the topics and counts for chart data
    const sortedTopics = Object.keys(topicsCount).sort((a, b) => topicsCount[b] - topicsCount[a]);

    // Take only the top 10 topics
    const top10Topics = sortedTopics.slice(0, 10);

    // Extract the topics and counts for chart data
    const chartLabels = top10Topics;
    const chartData = chartLabels.map(label => topicsCount[label]);
    // Update or create the chart
    if (this.chart) {
      this.chart.data.labels = chartLabels;
      this.chart.data.datasets[0].data = chartData;
      this.chart.update();
    } else {
      const ctx = document.getElementById('chart') as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [{
            label: 'Topic Occurrences',
            data: chartData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    }

  TitleChart(){
    
    const titlesCount: { [key: string]: number } = {};
  
    // Count the occurrences of each topic
    this.filteredSessions.forEach(session => {
      for (const title of session.title.split(' ')){
        if (title.toLowerCase() in titlesCount) {
          titlesCount[title.toLowerCase()]++;
        } else {
          titlesCount[title.toLowerCase()] = 1;
        }
      }
      
    });
    
    // Extract the topics and counts for chart data
    const sortedTitles = Object.keys(titlesCount).sort((a, b) => titlesCount[b] - titlesCount[a]);

    // Take only the top 10 topics
    const top10Topics = sortedTitles.slice(0, 20);

    // Extract the topics and counts for chart data
    const chartLabels = top10Topics;
    const chartData = chartLabels.map(label => titlesCount[label]);
    // Update or create the chart
    if (this.titlechart) {
      this.titlechart.data.labels = chartLabels;
      this.titlechart.data.datasets[0].data = chartData;
      this.titlechart.update();
    } else {
      const ctx = document.getElementById('titlechart') as HTMLCanvasElement;
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [{
            label: 'Topic Occurrences',
            data: chartData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    }

  parse(object:string){
    let list :string[]=[];
    list =  object.replace(/\\u[\dA-Fa-f]{4}/g, match => {
      return String.fromCharCode(parseInt(match.substr(2), 16));
     }).replace(/", "/g, ';').replace(/"]/g, '').replace(/\["/g, '').split(';');
     return list;
  }
  
  ngOnInit(): void {
    this.fetchApiResponse();
  }
}

