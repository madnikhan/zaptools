import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";

// Fancy font transformations
const FANCY_FONTS = [
  { id: "bubble", name: "Bubble", preview: "𝓑𝓾𝓫𝓫𝓵𝓮" },
  { id: "cursive", name: "Cursive", preview: "𝒞𝓊𝓇𝓈𝒾𝓋𝑒" },
  { id: "bold", name: "Bold", preview: "𝐁𝐨𝐥𝐝" },
  { id: "italic", name: "Italic", preview: "𝐼𝑡𝑎𝑙𝑖𝑐" },
  { id: "script", name: "Script", preview: "𝓢𝓬𝓻𝓲𝓹𝓽" },
  { id: "double", name: "Double", preview: "𝔻𝕠𝕦𝕓𝕝𝕖" },
  { id: "outline", name: "Outline", preview: "𝕆𝕦𝕥𝕝𝕚𝕟𝕖" },
  { id: "smallcaps", name: "Small Caps", preview: "Sᴍᴀʟʟ Cᴀᴘs" },
  { id: "upsidedown", name: "Upside Down", preview: "ɥsıןƃuǝ ʇɥƃıɹ" },
  { id: "strikethrough", name: "Strikethrough", preview: "S̶t̶r̶i̶k̶e̶" },
  { id: "underline", name: "Underline", preview: "U̲n̲d̲e̲r̲l̲i̲n̲e̲" },
  { id: "dots", name: "Dots", preview: "D̤o̤t̤s̤" },
];

// Character mappings for different fonts
const FONT_MAPPINGS: Record<string, Record<string, string>> = {
  bubble: {
    'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃',
    'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩',
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
  },
  cursive: {
    'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': '𝑒', 'f': '𝒻', 'g': '𝑔', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': '𝑜', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
    'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵',
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
  },
  bold: {
    'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
    'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
  },
  italic: {
    'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
    'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍',
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
  },
  script: {
    'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃',
    'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩',
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
  },
  double: {
    'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
    'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
    '0': '𝟖', '1': '𝟗', '2': '𝟘', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡'
  },
  outline: {
    'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
    'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
    '0': '𝟖', '1': '𝟗', '2': '𝟖', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '��', '9': '𝟡'
  },
  smallcaps: {
    'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ',
    'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ꜰ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ', 'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ', 'S': 'ꜱ', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
  },
  upsidedown: {
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
    'A': '∀', 'B': 'B', 'C': 'Ɔ', 'D': 'D', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'K', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
    '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6'
  },
  strikethrough: {
    'a': 'a̶', 'b': 'b̶', 'c': 'c̶', 'd': 'd̶', 'e': 'e̶', 'f': 'f̶', 'g': 'g̶', 'h': 'h̶', 'i': 'i̶', 'j': 'j̶', 'k': 'k̶', 'l': 'l̶', 'm': 'm̶', 'n': 'n̶', 'o': 'o̶', 'p': 'p̶', 'q': 'q̶', 'r': 'r̶', 's': 's̶', 't': 't̶', 'u': 'u̶', 'v': 'v̶', 'w': 'w̶', 'x': 'x̶', 'y': 'y̶', 'z': 'z̶',
    'A': 'A̶', 'B': 'B̶', 'C': 'C̶', 'D': 'D̶', 'E': 'E̶', 'F': 'F̶', 'G': 'G̶', 'H': 'H̶', 'I': 'I̶', 'J': 'J̶', 'K': 'K̶', 'L': 'L̶', 'M': 'M̶', 'N': 'N̶', 'O': 'O̶', 'P': 'P̶', 'Q': 'Q̶', 'R': 'R̶', 'S': 'S̶', 'T': 'T̶', 'U': 'U̶', 'V': 'V̶', 'W': 'W̶', 'X': 'X̶', 'Y': 'Y̶', 'Z': 'Z̶',
    '0': '0̶', '1': '1̶', '2': '2̶', '3': '3̶', '4': '4̶', '5': '5̶', '6': '6̶', '7': '7̶', '8': '8̶', '9': '9̶'
  },
  underline: {
    'a': 'a̲', 'b': 'b̲', 'c': 'c̲', 'd': 'd̲', 'e': 'e̲', 'f': 'f̲', 'g': 'g̲', 'h': 'h̲', 'i': 'i̲', 'j': 'j̲', 'k': 'k̲', 'l': 'l̲', 'm': 'm̲', 'n': 'n̲', 'o': 'o̲', 'p': 'p̲', 'q': 'q̲', 'r': 'r̲', 's': 's̲', 't': 't̲', 'u': 'u̲', 'v': 'v̲', 'w': 'w̲', 'x': 'x̲', 'y': 'y̲', 'z': 'z̲',
    'A': 'A̲', 'B': 'B̲', 'C': 'C̲', 'D': 'D̲', 'E': 'E̲', 'F': 'F̲', 'G': 'G̲', 'H': 'H̲', 'I': 'I̲', 'J': 'J̲', 'K': 'K̲', 'L': 'L̲', 'M': 'M̲', 'N': 'N̲', 'O': 'O̲', 'P': 'P̲', 'Q': 'Q̲', 'R': 'R̲', 'S': 'S̲', 'T': 'T̲', 'U': 'U̲', 'V': 'V̲', 'W': 'W̲', 'X': 'X̲', 'Y': 'Y̲', 'Z': 'Z̲',
    '0': '0̲', '1': '1̲', '2': '2̲', '3': '3̲', '4': '4̲', '5': '5̲', '6': '6̲', '7': '7̲', '8': '8̲', '9': '9̲'
  },
  dots: {
    'a': 'a̤', 'b': 'b̤', 'c': 'c̤', 'd': 'd̤', 'e': 'e̤', 'f': 'f̤', 'g': 'g̤', 'h': 'h̤', 'i': 'i̤', 'j': 'j̤', 'k': 'k̤', 'l': 'l̤', 'm': 'm̤', 'n': 'n̤', 'o': 'o̤', 'p': 'p̤', 'q': 'q̤', 'r': 'r̤', 's': 's̤', 't': 't̤', 'u': 'ṳ', 'v': 'v̤', 'w': 'w̤', 'x': 'x̤', 'y': 'y̤', 'z': 'z̤',
    'A': 'A̤', 'B': 'B̤', 'C': 'C̤', 'D': 'D̤', 'E': 'E̤', 'F': 'F̤', 'G': 'G̤', 'H': 'H̤', 'I': 'I̤', 'J': 'J̤', 'K': 'K̤', 'L': 'L̤', 'M': 'M̤', 'N': 'N̤', 'O': 'O̤', 'P': 'P̤', 'Q': 'Q̤', 'R': 'R̤', 'S': 'S̤', 'T': 'T̤', 'U': 'Ṳ', 'V': 'V̤', 'W': 'W̤', 'X': 'X̤', 'Y': 'Y̤', 'Z': 'Z̤',
    '0': '0̤', '1': '1̤', '2': '2̤', '3': '3̤', '4': '4̤', '5': '5̤', '6': '6̤', '7': '7̤', '8': '8̤', '9': '9̤'
  }
};

export default function FancyFontsConverter() {
  const [inputText, setInputText] = useState("");
  const [selectedFont, setSelectedFont] = useState("bubble");
  const [copied, setCopied] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const convertText = (text: string, fontType: string) => {
    if (!text) return "";
    const mapping = FONT_MAPPINGS[fontType];
    if (!mapping) return text;
    
    return text.split('').map(char => {
      const lowerChar = char.toLowerCase();
      const upperChar = char.toUpperCase();
      
      if (mapping[lowerChar]) {
        return char === lowerChar ? mapping[lowerChar] : mapping[lowerChar];
      }
      if (mapping[upperChar]) {
        return char === upperChar ? mapping[upperChar] : mapping[upperChar];
      }
      return char;
    }).join('');
  };

  const handleCopy = async (text: string, fontName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(fontName);
      setTimeout(() => setCopied(null), 1200);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const convertedText = convertText(inputText, selectedFont);

  return (
    <>
      <SEOHead
        title="Text to Fancy Fonts Converter | ZapTools"
        description="Generate stylish and fancy text for your social media bios, captions, and comments. Free online fancy fonts converter by ZapTools."
        keywords="fancy fonts, text to fancy fonts, stylish text, instagram fonts, tiktok fonts, twitter fonts, facebook fonts"
        url="https://zaptools.tech/tools/fancy-fonts-converter"
        contentType="tool"
        category="Social Media"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4 flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 max-w-4xl w-full flex flex-col items-center">
          <h1 className="text-4xl font-black text-gray-900 mb-2 text-center">Text to Fancy Fonts Converter</h1>
          <p className="text-lg text-gray-700 mb-6 text-center">Generate stylish text for your social media bios, captions, and comments!</p>

          {/* Instructions */}
          <div className="mb-6 w-full">
            <button
              type="button"
              className="flex items-center gap-2 font-bold text-blue-700 text-lg focus:outline-none mb-2"
              onClick={() => setShowInstructions(v => !v)}
              aria-expanded={showInstructions}
              aria-controls="instructions-box"
            >
              <span>ℹ️</span> How to Use
              <svg className={`w-5 h-5 transform transition-transform duration-200 ${showInstructions ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showInstructions && (
              <div id="instructions-box" className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4 shadow-sm animate-fade-in">
                <ul className="list-disc list-inside text-sm text-blue-900 space-y-1">
                  <li>Type or paste your text in the input field below</li>
                  <li>Choose a fancy font style from the options</li>
                  <li>Your text will be converted instantly</li>
                  <li>Click "Copy" to copy the fancy text to your clipboard</li>
                  <li>Use the fancy text in your social media posts, bios, or comments</li>
                </ul>
              </div>
            )}
          </div>

          {/* Font Style Selector */}
          <div className="mb-6 w-full">
            <label className="block text-sm font-semibold mb-3 text-gray-700">Choose Font Style:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {FANCY_FONTS.map(font => (
                <button
                  key={font.id}
                  onClick={() => setSelectedFont(font.id)}
                  className={`p-3 rounded-xl text-center transition-all duration-200 border-2 ${selectedFont === font.id ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600 shadow-lg' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'}`}
                  aria-pressed={selectedFont === font.id}
                >
                  <div className="text-lg mb-1">{font.preview}</div>
                  <div className="text-xs font-bold">{font.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div className="mb-6 w-full">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Enter Your Text:</label>
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full h-32 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-semibold bg-gray-50 resize-none"
              aria-label="Enter text to convert"
            />
          </div>

          {/* Converted Text Output */}
          {convertedText && (
            <div className="mb-6 w-full">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">Fancy Text:</label>
                <button
                  onClick={() => handleCopy(convertedText, selectedFont)}
                  className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${copied === selectedFont ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  {copied === selectedFont ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-200">
                <div className="text-2xl font-bold text-gray-900 break-words min-h-[2rem]">
                  {convertedText}
                </div>
              </div>
            </div>
          )}

          {/* Quick Examples */}
          <div className="w-full">
            <label className="block text-sm font-semibold mb-3 text-gray-700">Quick Examples:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Hello World", "Instagram Bio", "Cool Username", "Love You ❤️"].map(example => (
                <button
                  key={example}
                  onClick={() => setInputText(example)}
                  className="p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-sm font-semibold"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">Perfect for Instagram bios, TikTok captions, Twitter posts, and more!</p>
        </div>
      </main>
      <Footer />
    </>
  );
} 