import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-page-convert',
    templateUrl: 'page-convert.component.html',
    styleUrls: ['page-convert.component.css'],
})

export class PageConvert implements OnInit {
    
   
    constructor(private fb: FormBuilder) {}
    average = ''

    normalization: number

    cyan: any
    magenta: any 
    yellow: any
    black: any

    blue:any
    red: any
    green:any
    
    hue: any
    saturation: any
    value: any

    redLinha: any
    blueLinha: any
    greenLinha: any
    red2: any
    blue2: any
    green2: any

    

    form1: FormGroup
    form2: FormGroup
    form3: FormGroup
    form4: FormGroup
    form5: FormGroup
    form6: FormGroup
    ngOnInit(): void {
        this.formCreation();
    }
    formCreation() {
        this.form1 = this.fb.group({
            R: [''],
            G: [''],
            B: [''],
        });
        this.form2 = this.fb.group({
            R: [''],
            G: [''],
            B: [''],
        });
        this.form3 = this.fb.group({
            R: [''],
            G: [''],
            B: [''],
        });
        this.form4 = this.fb.group({
            C: [''],
            M: [''],
            Y: [''],
            K: [''],
        });
        this.form5= this.fb.group({
            R: [''],
            G:  [''],
            B: [''],
        })
        this.form6= this.fb.group({
            H: [''],
            S: [''],
            V: [''],
        })
    }
   
    RGBToGrayscale() {
        const RED = parseInt(this.form1.get('R')?.value)
        const GREEN = parseInt(this.form1.get('G')?.value)
        const BLUE = parseInt(this.form1.get('B')?.value)
        this.average = ((RED + GREEN + BLUE)/3).toFixed(2)
    }

    normalizeRGBvalue() {
        const RED = parseInt(this.form2.get('R')?.value)
        const GREEN = parseInt(this.form2.get('G')?.value)
        const BLUE = parseInt(this.form2.get('B')?.value)
        const sunRed = (RED/(RED + GREEN + BLUE))
        const sunGreen = (GREEN/(RED + GREEN + BLUE))
        const sunBlue= (BLUE/(RED + GREEN + BLUE))

        this.normalization = sunRed + sunGreen + sunBlue
    }

    RGBtoCMYK() {
        
        const RED = (this.form3.get('R')?.value)/255
        const GREEN = (this.form3.get('G')?.value)/255
        const BLUE = (this.form3.get('B')?.value)/255
      
        const black100 = (1-Math.max(RED, GREEN, BLUE)) * 100
        const black = 1-Math.max(RED, GREEN, BLUE)

        this.black = black100
        this.cyan = ((1-RED-black) / (1-black)) * 100
        this.magenta = ((1-GREEN-black) / (1-black)) * 100
        this.yellow = ((1-BLUE-black) / (1-black)) * 100

    }

    CMYKtoRGB() {
        
        const CYAN = parseFloat(this.form4.get('C')?.value)
        const MAGENTA = parseFloat(this.form4.get('M')?.value)
        const YELLOW = parseFloat(this.form4.get('Y')?.value)
        const BLACK =  parseFloat(this.form4.get('K')?.value)

        this.red = (255*(1-(CYAN/100))*(1-(BLACK/100))).toFixed(2)
        this.green = (255*(1-(MAGENTA/100))*(1-(BLACK/100))).toFixed(2)
        this.blue = (255*(1-(YELLOW/100))*(1-(BLACK/100))).toFixed(2)
    }

    RGBtoHSV() {
        const RED = (this.form5.get('R')?.value) / 255
        const GREEN = (this.form5.get('G')?.value) / 255
        const BLUE = (this.form5.get('B')?.value) / 255
      
        const cmax = Math.max(RED, GREEN, BLUE)
        const cmin = Math.min(RED, GREEN, BLUE)
        
        if((cmax === RED) && (GREEN >= BLUE)) {
            this.hue = 60*((GREEN-BLUE)/(cmax-cmin))+0
        }
        if((cmax === RED) && (GREEN < BLUE)) {
            this.hue = 60*((GREEN-BLUE)/(cmax-cmin))+360
        }
        if(cmax === GREEN) {
            this.hue = 60*((BLUE-RED)/(cmax-cmin))+120
        }
        if(cmax === BLUE) {
            this.hue = 60*((RED-GREEN)/(cmax-cmin))+240
        }

        this.saturation = ((cmax-cmin)/cmax)*100
        this.value = cmax*100
    }


    HSVtoRGB() {
        const HUE = (this.form6.get('H')?.value)
        const SATURATION = (this.form6.get('S')?.value) /100
        const VALUE = (this.form6.get('V')?.value)/100

        const C = VALUE*SATURATION
        const X = C*(1-Math.abs((parseInt(HUE)/60)%2-1))
        const M = VALUE - C

        if(HUE>=0 && HUE<60) {
            this.redLinha = C, this.greenLinha = X, this.blueLinha = 0;
        }
        if (HUE>=60 && HUE < 120) {
           this.redLinha = X, this.greenLinha = C, this.blueLinha = 0;
        } else if(HUE>=120 && HUE < 180) {
           this.redLinha = 0, this.greenLinha = C, this.blueLinha = X;

        } else if (HUE>=180 && HUE < 240) {
           this.redLinha = 0, this.greenLinha = X, this.blueLinha = C;
        } else if (HUE>=240 && HUE < 300) {
           this.redLinha = X, this.greenLinha = 0, this.blueLinha = C;

        } else if (HUE>=300 && HUE < 360) {
           this.redLinha = C, this.greenLinha = 0, this.blueLinha = X;  
        }   
        
        this.red2 = (this.redLinha+M)*255;
        this.green2= (this.greenLinha+M)*255;
        this.blue2= (this.blueLinha+M)*255;
    }


}
