class HashMap {
  constructor() {
    this.size = 16;
    this.taken = 0;
    this.buckets = [];
    this.keysNumber = 0;
  }
  set(key, value) {
    let index = this._hash(key);
    let bucket = this.buckets[index];
    if (!bucket) {
      this.keysNumber++;
      this._sizeUpdate(1);
      this.buckets[index] = [[key, value]];
      return this.buckets[index];
    } else {
      for (let b of bucket) {
        if (b[0] === key) {
          b[1] = value;
          return bucket;
        }
      }
      this.buckets[index] = [...bucket, [key, value]];
      this.keysNumber++;
      return this.buckets[index];
    }
  }

  get(key) {
    const index = this._hash(key);
    if (this.buckets[index]) {
      for (let b of this.buckets[index]) {
        if (b[0] === key) {
          console.log(b[1]);
          return b[1];
        }
      }
    }
    return null;
  }

  has(key) {
    const index = this._hash(key);
    if (this.buckets[index]) {
      for (let b of this.buckets[index]) {
        if (b[0] === key) {
          return true;
        }
      }
    }
    return false;
  }

  keys() {
    return this._getAll("keys");
  }
  values() {
    return this._getAll("values");
  }
  entries() {
    return this._getAll("entries");
  }
  clear() {
    this.buckets = [];
    this.size = 16;
    this.taken = 0;
    this.keysNumber = 0;
  }
  remove(key) {
    //tofix
    let found = false;
    let index = this._hash(key);
    let bucket = this.buckets[index];
    if (bucket) {
      bucket.forEach((b, i) => {
        if (b[0] === key) {
          this.keysNumber--;
          bucket.splice(i, 1);
          if (!bucket.length) {
            this.buckets[index] = undefined;
            this._sizeUpdate(-1);
          }
          found = true;
        }
      });
    }
    return found;
  }
  _hash(key) {
    if (typeof key !== "string" || key === "") throw new Error("Key must be a none empty string");
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < Math.min(key.length, 200); i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % (this.size + 1);
  }
  _sizeUpdate(num) {
    const load = 0.7;
    if (num > 0) {
      this.taken++;
      if (this.taken >= this.size * load) {
        this.size = this.size * 2;
        this._bucketsUpdate();
      }
    }

    if (num < 0) {
      this.taken--;
      if (this.size > 16 && (this.size / 2) * load >= this.taken) {
        this.size = this.size / 2;
        this._bucketsUpdate();
      }
    }
  }

  _bucketsUpdate() {
    const oldBuckets = this.buckets;
    this.buckets = [];
    this.taken = 0;
    for (let bucket of oldBuckets) {
      if (!bucket) continue;
      for (let b of bucket) {
        this.set(b[0], b[1]);
      }
    }
  }

  _getAll(find) {
    const result = [];
    for (let bucket of this.buckets) {
      if (!bucket) continue;
      for (let b of bucket) {
        if (find === "keys") {
          result.push(b[0]);
        } else if (find === "values") {
          result.push(b[1]);
        } else {
          result.push(b);
        }
      }
    }
    return result;
  }
  length() {
    return this.keysNumber;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");
test.set("greet", "hello");

console.log(`taken: ${test.taken} size: ${test.size} that's ${(test.taken / test.size) * 100}%`);
