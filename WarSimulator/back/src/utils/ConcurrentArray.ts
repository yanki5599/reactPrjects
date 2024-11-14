import { Mutex } from "async-mutex";

export class ConcurrentArray<T> {
  private array: T[] = [];
  private mutex = new Mutex();

  // Adds an item to the array
  async add(item: T): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      this.array.push(item);
    } finally {
      release();
    }
  }

  // Gets a copy of the array to prevent direct modifications
  async getArray(): Promise<T[]> {
    const release = await this.mutex.acquire();
    try {
      return [...this.array];
    } finally {
      release();
    }
  }

  // Removes an item if found
  async remove(item: T): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      const index = this.array.indexOf(item);
      if (index !== -1) {
        this.array.splice(index, 1);
      }
    } finally {
      release();
    }
  }

  // Gets the length of the array
  async getLength(): Promise<number> {
    const release = await this.mutex.acquire();
    try {
      return this.array.length;
    } finally {
      release();
    }
  }
  // Finds an item by predicate and updates it using the provided update function
  async findByAndUpdate(
    predicate: (item: T) => boolean,
    updateFn: (item: T) => T
  ): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      const index = this.array.findIndex(predicate);
      if (index !== -1) {
        this.array[index] = updateFn(this.array[index]);
      }
    } finally {
      release();
    }
  }
}
