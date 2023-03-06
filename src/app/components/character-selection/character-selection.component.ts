import { Component } from "@angular/core";
import { Character } from "src/app/models/character";
import { CharacterService } from "src/app/services/character.service";

@Component({
  selector: "app-character-selection",
  templateUrl: "./character-selection.component.html",
  styleUrls: ["./character-selection.component.scss"],
})
export class CharacterSelectionComponent {
  // Initial state before updating on initialization, first character hardcoded for now
  characters: Character[] = [
    {
      id: "vader",
      name: "Darth<br>Vader",
      side: "Sötét",
      force: {
        midichlorian: 21000,
        power: "Erő használata",
      },
      description:
        "Vader az egyik legmarkánsabb, legikonikusabb és legkarizmatikusabb gonosztevő, hatalmas (bár még emberléptékű) termetével, sötét sisakjával, félelmetes akusztikájú, jellegzetes lélegzetvételével és hangképzésével.",
      createdTimestamp: 1576967247,
    },
  ];

  private currentSerial = 0; // Stores where the current character is in the characters array

  // Stores the currently choosen character
  selectedCharacter = {
    serial: this.currentSerial,
    id: this.characters[this.currentSerial].id,
    name: this.characters[this.currentSerial].name,
    side: this.characters[this.currentSerial].side,
    power: this.characters[this.currentSerial].force.power,
    description: this.characters[this.currentSerial].description,
    imgSrc: `/assets/images/characters/${
      this.characters[this.currentSerial].id
    }.png`,
  };

  constructor(private characterService: CharacterService) {}

  // Updates the currently choosen character
  updateCharacter() {
    this.selectedCharacter = {
      serial: this.currentSerial,
      id: this.characters[this.currentSerial].id,
      name: this.characters[this.currentSerial].name,
      side: this.characters[this.currentSerial].side === 'DARK' ? 'Sötét': 'Világos',
      power: this.characters[this.currentSerial].force.power,
      description: this.characters[this.currentSerial].description,
      imgSrc: `/assets/images/characters/${
        this.characters[this.currentSerial].id
      }.png`,
    };
  }

  // Get the characers from the corresponding service
  getCharacters() {
    this.characterService
      .getCharacters()
      .subscribe((res: any) => (this.characters = res.characters));
  }

  ngOnInit(): void {
    this.getCharacters(); // Make the request instantly on initialization
  }

  // Selects the previous character
  handleSlideLeft() {
    if (this.currentSerial === 0) {
      this.currentSerial = this.characters.length - 1;
    } else {
      this.currentSerial--;
    }
    this.updateCharacter();
  }

  // Selects the next character
  handleSlideRight() {
    if (this.currentSerial === this.characters.length - 1) {
      this.currentSerial = 0;
    } else {
      this.currentSerial++;
    }
    this.updateCharacter();
  }
}
