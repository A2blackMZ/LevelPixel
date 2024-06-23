import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userData = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
  };

  registrationError = '';

  constructor(private dataService: DataService, private router: Router) {}

  onSubmit(): void {
    this.registrationError = '';

    this.dataService.register(this.userData).subscribe(
      (response) => {
        console.log(response);
        // Redirection vers le composant de vérification après l'enregistrement réussi
        this.router.navigate(['/verification'], { queryParams: { email: this.userData.email } });
      },
      (error) => {
        console.error(error);
        this.registrationError = 'Erreur lors de l\'enregistrement';
      }
    );
  }


  // Function to toggle password visibility
  togglePasswordVisibility(fieldName: string): void {
    const inputField = document.getElementsByName(fieldName)[0] as HTMLInputElement;
    if (inputField.type === 'password') {
      inputField.type = 'text';
    } else {
      inputField.type = 'password';
    }
  }
}
