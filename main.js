// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    //method to return a PAequor DNA mutation
    mutate() {
      let selectedBaseIndex = Math.floor(Math.random() * 15);
      let selectedBase = this.dna[selectedBaseIndex];
      let bases = ["A", "T", "C", "G"];
      bases = bases.filter((el) => {
        return el !== selectedBase;
      });
      let newBase = bases[Math.floor(Math.random() * 3)];
      this.dna[selectedBaseIndex] = newBase;
      return this.dna;
    },
    //method to compare this pAequor to another pAequor
    compareDna(anotherPAquor) {
      let anotherDna = anotherPAquor.dna;
      let count = 0;
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === anotherDna[i]) {
          count += 1;
        }
      }
      let percetage = Math.round((count / 15) * 100);
      let message = `specimen ${this.specimenNum} and specimen ${anotherPAquor.specimenNum} have ${percetage}% DNA in common`;
      console.log(message);
    },
    //method that returns true if pAequour will survive
    willLikelySurvive() {
      let count = 0;
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          count += 1;
        }
      }
      let rateOfSurvival = Math.round((count / 15) * 100);
      if (rateOfSurvival >= 60) {
        return true;
      } else {
        return false;
      }
    },
  };
};

// function to create 30 instances of pAquor that
//can survive in their natural environment
const generatepAequorArray = () => {
  const pAequorArray = [];
  for (let i = 200; i < 230; i++) {
    let a = pAequorFactory(i, mockUpStrand());
    if (a.willLikelySurvive()) {
      pAequorArray.push(a);
    } else {
      while (!a.willLikelySurvive()) {
        a = pAequorFactory(i, mockUpStrand());
        if (a.willLikelySurvive()) {
          pAequorArray.push(a);
          break;
        }
      }
    }
  }
  return pAequorArray;
};
const the30instances = generatepAequorArray();
console.log(the30instances);
// Driver code

const obj1 = pAequorFactory(101, mockUpStrand());
console.log(obj1);
console.log(obj1.mutate());

const obj2 = pAequorFactory(102, mockUpStrand());
console.log(obj2);

obj1.compareDna(obj2);

console.log(obj1.willLikelySurvive());
