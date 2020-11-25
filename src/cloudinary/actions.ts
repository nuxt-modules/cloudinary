import { Border, CustomFunction, Effect, Position, Resize, Transformer, TransformerOption } from 'cloudinary-build-url'
import { Flag, Radius, Rotation } from 'cloudinary-build-url/dist/cjs/types/CldOptions'

export type DeliveryOptions = {
 colorSpace?: string,
 density?: number,
 format?: string,
 quality?: string,
 defaultImage?: string,
 dpr?: string | number
}

export class Actions {
 private _options: TransformerOption

 constructor(options: TransformerOption = {}) {
   this._options = options
 }
 resize(options: Resize = {}):Actions {
   this._options.resize = {
     ...(this._options.resize || {}),
     ...options
   }

   return this
 }
 effect(effect: Effect) {
   this._options.effect = effect
   return this
 }
 background(value: string):Actions {
   this._options.background = value
   return this
 }
 roundCorner(pixels: Radius):Actions {
   this._options.radius = pixels
   return this
 }
 border(options: Border):Actions { 
   this._options.border = this._options.border ? {
     ...(this._options.border as Object),
     ...(options)
   } : options
   
   return this
 }
 delivery({ colorSpace, density, format, dpr, quality, defaultImage } : DeliveryOptions):Actions { 
   this._options.colorSpace = colorSpace || this._options.colorSpace
   this._options.density = density || this._options.density
   this._options.format = format || this._options.format
   this._options.dpr = dpr || this._options.dpr
   this._options.quality = quality || this._options.quality
   this._options.defaultImage = defaultImage || this._options.defaultImage

   return this
 }
 customFunction(value: CustomFunction):Actions { 
   this._options.customFunction = value

   return this
 }
 color(value: string):Actions { 
   this._options.color = value
   return this
 }
 condition(options: {if?: string, endIf?: string, else?: string}):Actions { 
   this._options.if = options.if || this._options.if
   this._options.endIf = options.endIf || this._options.endIf
   this._options.else = options.else || this._options.else

   return this 
 }
 overlay(value: string):Actions { 
   this._options.overlay = value
   return this 
 }
 underlay(value: string):Actions { 
   this._options.underlay = value
   return this 
 }
 flags(value: Flag):Actions {
   this._options.flags = value
   return this 
 }
 page(value: string):Actions { 
   this._options.page = value
   return this 
 }
 chain():Actions { 
   //TODO: fix
   const options = {
     ...this._options,
     chaining: this._options.chaining ? [...this._options.chaining] : []
   }

   if (Array.isArray(this._options.chaining)) {
     this._options.chaining.push(options)
   } else {
     this._options.chaining = [ options ]
   }

   return this 
 }
 position(options: Position = {}):Actions { 
   this._options.position = {
     ...(this._options.position || {}),
     ...options
   } 

   return this 
 }
 zoom(value: number):Actions { 
   this._options.zoom = value
   return this 
 }
 rotate(angle: Rotation):Actions { 
   this._options.rotation = angle

   return this 
 }
 opacity(value: number):Actions { 
   this._options.opacity = value
   return this 
 }
 toString() {
   const transformations = Transformer.transform(this._options)
   return Transformer.toString(transformations)
 }
}
