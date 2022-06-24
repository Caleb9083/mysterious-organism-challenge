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
      return percetage;
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
    //method to generate the complement of the DNA strand
    complementStrand() {
      theComplementStrand = [];
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === "A") {
          theComplementStrand.push("T");
        } else if (this.dna[i] === "T") {
          theComplementStrand.push("A");
        } else if (this.dna[i] === "G") {
          theComplementStrand.push("C");
        } else {
          theComplementStrand.push("G");
        }
      }
      return theComplementStrand;
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

//funtion to find the most related instances of pAequor.
const mostRelatedInstances = () => {
  let mostRelated = 0;
  let mostRelatedPair = NaN;
  for (let i = 0; i < 29; i++) {
    let valueofComparison = the30instances[i].compareDna(the30instances[i + 1]);
    if (valueofComparison > mostRelated) {
      mostRelated = valueofComparison;
      mostRelatedPair = [the30instances[i], the30instances[i + 1]];
    }
  }
  return mostRelatedPair;
};
// Driver code

the30instances.forEach((el) => console.log(el.willLikelySurvive()));

const obj1 = pAequorFactory(101, mockUpStrand());
console.log(obj1);
console.log(obj1.mutate());

const obj2 = pAequorFactory(102, mockUpStrand());
console.log(obj2);

obj1.compareDna(obj2);

console.log(obj1.willLikelySurvive());

console.log(obj1.dna);
console.log(obj1.complementStrand());

console.log(mostRelatedInstances());
