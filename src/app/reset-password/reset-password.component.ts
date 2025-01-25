import { Component, OnInit, inject } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'] // Correction de styleUrl
})
export class ResetPasswordComponent implements OnInit {
  showProgress: boolean = false; // Indicateur de chargement
  token: string = ''; // Token récupéré de l'URL
  isSuccess: boolean = false; // Pour afficher le succès
  errorMessage: string = ''; // Message d'erreur

  private _formBuilder = inject(FormBuilder);

  // Initialisation du formulaire avec validation
  passwordFormGroup = this._formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    cpassword: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer le token depuis l'URL
    const tokenParam = this.route.snapshot.queryParamMap.get('token');
    if (tokenParam) {
      this.token = tokenParam;
    } else {
      this.errorMessage = 'Invalid or missing token.';
    }
  }

  // Fonction pour mettre à jour le mot de passe
  updatePassword(): void {
    if (this.passwordFormGroup.valid) {
      const payload = {
        password: this.passwordFormGroup.get('password')?.value||"",
        confirmPassword: this.passwordFormGroup.get('cpassword')?.value,
      };

      if (payload.password !== payload.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Passwords must match.`,
        });
        return;
      }

      this.showProgress = true;

      this.authService.resetPassword(this.token, payload.password).subscribe({
        next: (data) => {
          this.showProgress = false;
          Swal.fire({
            title: 'Updated!',
            text: 'Password updated successfully.'+data,
            icon: 'success',
          }).then(() => {
            this.router.navigateByUrl('/login'); 
          });
        },
        error: (err) => {
          console.error('Error updating password:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update password. Please try again.',
          });
        }
      });
    }
  }
}
