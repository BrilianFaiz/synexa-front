//src => theme/typography.ts
import { colors } from "./colors";

export const typography = {
header:{
fontfamily: "Inter", //=> cara ngambil value ini gimana kan dipakainya <Text style={{fontFamily: typography.header.fontfamily}}>Header</Text> bener ?
fontsize: 24,
fontweight: "bold",
},
title:{
fontfamily: "Inter",
fontsize: 20,
fontweight: "bold",
},
subtitle:{
fontfamily: "Inter", 
fontsize: 16,
fontweight: "bold",
},
paragraph:{
fontfamily: "Inter",
fontsize: 14,
fontweight: "normal",
},
label:{
fontfamily: "Inter",
fontsize: 12,
fontweight: "normal",
},
button:{
fontfamily: "Inter",
fontsize: 11,
fontweight: "bold",
},
error:{
fontfamily: "Inter",
fontsize: 14,
fontweight: "normal",
fontcolor: colors.error,
},
placeholder:{
fontfamily: "Inter",
fontsize: 14,
fontweight: "normal",
fontcolor: colors.textSecondary,
},
};