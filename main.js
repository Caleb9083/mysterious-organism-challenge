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
  };
};

// Driver code

const obj1 = pAequorFactory(101, mockUpStrand());
console.log(obj1);
console.log(obj1.mutate());
