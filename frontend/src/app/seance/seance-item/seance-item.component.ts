import { Component, Input } from '@angular/core';
import { Seance } from '../../services/seance.service';
import { ExerciceService, Exercice } from '../../services/exercice.service';
import { CoachService } from '../../services/coach.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-seance-item',
  templateUrl: './seance-item.component.html',
  styleUrl: './seance-item.component.css',
})
export class SeanceItemComponent {
  @Input() seance: Seance = new Seance();
  public exercices: Exercice[] = [];
  public nomCoach: string = '';
  public nomsExercices: string = '';
  public logged: boolean = false;

  constructor(
    private exerciceService: ExerciceService,
    private coachService: CoachService,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    if (this.authService.currentAuthUserValue.isLogged()) {
      this.logged = true;
    }
    if (this.seance.exercices.length > 0 && this.seance.coach.id > 0) {
      this.exerciceService
        .getExercicesByIds(this.seance.exercices.map((e) => e.id))
        .subscribe({
          next: (exercices) => {
            this.exercices = exercices;
            this.nomsExercices = this.exercices.map((e) => e.nom).join(', ');
          },
          error: (error) => {
            console.error('Erreur lors du chargement des exercices :', error);
          },
        });

      this.coachService.getCoach(this.seance.coach.id).subscribe({
        next: (coach) => {
          this.nomCoach = `${coach.prenom} ${coach.nom}`;
        },
        error: (error) => {
          console.error('Erreur lors du chargement du coach :', error);
        },
      });
    } else {
      console.error("Pas d'exercices ou coach pour la séance");
      this.nomsExercices = 'Aucun exercice';
      this.nomCoach = 'Coach introuvable';
    }
  }
}
