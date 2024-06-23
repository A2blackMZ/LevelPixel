import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html'
})
export class VerificationComponent {
  email: string = '';
  confirmationCode: string = '';
  verificationError: string = '';
  verificationSuccess: string = '';

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  verify() {
    this.verificationError = '';
    this.verificationSuccess = '';

    this.dataService.confirm(this.email, this.confirmationCode).subscribe(
      response => {
        console.log('Verification successful:', response);
        this.verificationSuccess = 'Votre compte a été vérifié avec succès!';
        this.router.navigate(['/login']); // Redirige immédiatement vers le tableau de bord
      },
      error => {
        console.error('Verification error:', error);
        this.verificationError = 'La vérification a échoué. Veuillez réessayer.';
      }
    );
  }
}
