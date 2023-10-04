interface ISnapCarousel<T> {
  data: T[]
  keyExtractor: (item: T, index: number) => string
  renderItem: React.FC<T>
}

export type { ISnapCarousel }
