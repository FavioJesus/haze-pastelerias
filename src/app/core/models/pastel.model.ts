export type Categoria = 'flores' | 'frutas' | 'chocolate' | 'infantiles' | 'tematicos';

export interface Pastel {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: Categoria;
  etiqueta: string;
  imagen: string;
  destacado: boolean;
}
