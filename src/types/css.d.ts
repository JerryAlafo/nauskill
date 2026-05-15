// Declara módulos CSS para satisfazer TypeScript 5.x strict mode
declare module "*.css" {
  const content: { [className: string]: string }
  export default content
}
