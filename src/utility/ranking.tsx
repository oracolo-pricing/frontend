function getEmojiFromNumber(num: number) {
   switch (num) {
      case 1:
         return "1️⃣";
      case 2:
         return "2️⃣";
      case 3:
         return "3️⃣";
      case 4:
         return "4️⃣";
      case 5:
         return "5️⃣";
      case 6:
         return "6️⃣";
      case 7:
         return "7️⃣";
      case 8:
         return "8️⃣";
      case 9:
         return "9️⃣";
   }
}
export function getRankingEmojiFromNumber(num: number) {
   switch (num) {
      case 1:
         return "🏆";
      case 2:
         return "🥈";
      case 3:
         return "🥉";
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
         return getEmojiFromNumber(num);
      default:
         // Split the string into its characters and map each character to its emoji equivalent
         return num
            .toString()
            .split("")
            .map((char) => getEmojiFromNumber(parseInt(char)))
            .join("");
   }
}

export function getRankingCircleFromNumber(num: number) {
   let number = String(num);
   let backgroundColor = "bg-secondary";
   let color = "";
   if (num === 1) {
      backgroundColor = "bg-yellow-300";
   }
   if (num === 2) {
      backgroundColor = "bg-yellow-600";
      color = "text-white";
   }
   if (num === 3) {
      backgroundColor = "bg-yellow-900";
      color = "text-white";
   }

   return (
      <div
         className={`font-mono font-semibold text-xs rounded-full w-5 aspect-square bg-red flex items-center justify-center ${backgroundColor} ${color}`}
      >
         {number}
      </div>
   );
}
