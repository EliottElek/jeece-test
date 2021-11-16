"use strict";

var products = [{
  title: "Robe de marié",
  author: "Lemaitre Pierre",
  price: 24.9,
  publishingDate: "01/09/2021",
  description: "Sophie, une jeune femme qui mène une existence paisible, commence à sombrer lentement dans la folie : est-elle responsable de la mort de sa belle-mère, de celle de son mari infirme ? Peu à peu, elle se retrouve impliquée dans plusieurs meurtres dont, curieusement, elle n’a aucun souvenir. Alors, désespérée mais lucide, elle organise sa fuite, en changeant de vie…",
  mediaUrl: "https://www.editionslibradiffusio.fr/846-large_default/robe-de-marie.jpg",
  stock: 12,
  category: "Drame"
}, {
  title: "Versant secret",
  author: "Breuzé Patrick",
  price: 24.6,
  publishingDate: "01/09/2021",
  description: "Ancien médecin, Martin a tout quitté pour partir en quête d’une nouvelle vie. Séjournant dans un village de Haute-Savoie, il est fasciné par celle qu’on appelle la « femme aux chèvres », une bergère d’une beauté troublante à laquelle la rumeur prête une lourde responsabilité dans la mort d’un écrivain anglais lors d’une course en montagne. De quoi est-elle coupable ? En voulant l’aider à exorciser le passé, Martin va découvrir un bouleversant secret…",
  mediaUrl: "https://www.editionslibradiffusio.fr/851-large_default/versant-secret.jpg",
  stock: 12,
  category: "Amour"
}, {
  title: "Vers le soleil",
  author: "Sandrel Julien",
  price: 23.9,
  publishingDate: "01/09/2021",
  description: "14 août 2018. Tess part vers la Toscane, où elle doit rejoindre pour les vacances sa fille Sienna et l’oncle de celle-ci, Sacha. Mais à Gênes, elle est portée disparue suite à l’effondrement du pont. Lorsque Sacha apprend la catastrophe, c’est tout leur univers commun qui vole en éclats. Tous leurs mensonges aussi. Car Sacha n’est pas vraiment l’oncle de cette petite fille de neuf ans : il est un acteur, engagé pour jouer ce rôle particulier quelques jours par mois. Que va-t-il faire de la fillette ?",
  mediaUrl: "https://www.editionslibradiffusio.fr/850-large_default/vers-le-soleil.jpg",
  stock: 12,
  category: "Science Fiction"
}, {
  title: "Un été sous les tilleuls",
  author: "Malaval Jean-Paul",
  price: 23,
  publishingDate: "01/09/2021",
  description: "Famille, je vous hais ! Albin Dumontel coule des jours tranquilles dans son manoir de la campagne limousine. Un héritage pieusement conservé où le vieil homme entretient le souvenir de ses deux épouses défuntes. Mais à l’été, M. Dumontel se doit de sacrifier à un rite bien établi : l’irruption de sa famille. Deux enfants et cinq petits-enfants viennent bientôt troubler la sérénité des lieux. Lorsque la belle-fille d’Albin aborde la question de l’héritage, les masques tombent et les clans se forment.",
  mediaUrl: "https://www.editionslibradiffusio.fr/849-large_default/un-ete-sous-les-tilleuls.jpg",
  stock: 12,
  category: "Fantastique"
}, {
  title: "Trois vœux",
  author: "Moriarty Liane",
  price: 23,
  publishingDate: "01/09/2021",
  description: "Il y a Lynn, la sœur raisonnable. Cat, dont tout le monde envie le prétendu mariage parfait. Et Gemma, qui change de job et de fiancé comme de chemise. Elles sont sœurs, triplées, soudées. Ensemble, elles ont toujours réussi à surmonter les épreuves de la vie. Jusqu’à cette fête pour leur trente-quatrième anniversaire qui lève le voile sur de dérangeantes vérités. Et menace de les plonger dans le chaos.",
  mediaUrl: "https://www.editionslibradiffusio.fr/848-large_default/trois-voeux.jpg",
  stock: 12,
  category: "Philosophie"
}, {
  title: "Retour à Whistle Stop",
  author: "Flagg Fannie",
  price: 23,
  publishingDate: "01/09/2021",
  description: "Bud décide d’accomplir un dernier voyage à Whistle Stop, devenue une ville-fantôme, afin de revoir l’endroit où il fut si heureux. Chemin faisant, il va se faire de nouveaux amis, apprendre des choses surprenantes sur les gens qu’il a connus et dont il croyait tout savoir. Surtout, il va déclencher une série d’événements qui vont changer non seulement sa vie, mais aussi celle de ses proches.",
  mediaUrl: "https://www.editionslibradiffusio.fr/845-large_default/retour-a-whistle-stop.jpg",
  stock: 12,
  category: "Histoire"
}, {
  title: "Tout peut s'oublier",
  author: "Adam Olivier",
  price: 24,
  publishingDate: "01/09/2021",
  description: "Un appartement vide : c’est ce que trouve Nathan quand il vient chercher son petit garçon chez son ex-femme. Très vite, il doit se rendre à l’évidence : Jun est rentrée au Japon, son pays natal, avec Léo. À l’incompréhension succède la panique : comment les y retrouver ? Entre la Bretagne où il tente d’épauler Lise, elle aussi privée de son fils, et le Japon, Nathan se lance dans une quête effrénée.",
  mediaUrl: "https://www.editionslibradiffusio.fr/847-large_default/tout-peut-s-oublier.jpg",
  stock: 12,
  category: "Amour"
}, {
  title: "Marionnettes d'amour",
  author: "Fischer Élise",
  price: 24.5,
  publishingDate: "01/09/2021",
  description: "En cet été 1992, près de Nancy, Milou pleure la mort prématurée de Jacinthe. Plus qu’une cousine, elle était comme sa sœur et partageait avec elle sa passion pour les marionnettes. Jacinthe a laissé à l’attention de Milou un paquet de lettres qu’elle ne lui a jamais envoyées. Au fil de sa lecture, Milou va peu à peu exhumer la clé d’un redoutable secret…",
  mediaUrl: "https://www.editionslibradiffusio.fr/842-large_default/marionnettes-d-amour.jpg",
  stock: 12,
  category: "Histoire"
}, {
  title: "Les Flammes de la destinée",
  author: "Taylor Bradford Barbara",
  price: 24.5,
  publishingDate: "01/09/2021",
  description: "Londres, 1889. Après avoir gravi un à un les échelons de l’empire commercial de Henry Malvern, James doit maintenant faire face à la convoitise et à la trahison. Et si la rivalité féroce qui l’oppose à Alexis, l’unique héritière de l’entreprise familiale, dissimule aussi une irrésistible attraction, il se laisse cependant séduire par la ravissante Irina, fille d’immigrés russes. Un secret enfoui dans son passé va alors bouleverser sa vie, le contraignant à un choix difficile.",
  mediaUrl: "https://www.editionslibradiffusio.fr/840-large_default/les-flammes-de-la-destinee.jpg",
  stock: 12,
  category: "Drame"
}, {
  title: "Les Trois Vies de Suzana Baker",
  author: "Amar Philippe",
  price: 24.5,
  publishingDate: "01/09/2021",
  description: "Quand Lauren, professeur d’Histoire contemporaine à Boston, reçoit pour son anniversaire un test génétique destiné à établir ses origines généalogiques, elle trouve le cadeau de sa fille Emily très amusant. Quelle n’est cependant pas sa surprise quand elle en découvre les résultats, divulguant des origines ignorées. Une ascendance qui remet en question toute son existence ainsi que celle de sa fille et balaie d’un coup ce qu’on lui a toujours raconté de ses ancêtres. Qui peut l’aider à résoudre ce mystère ?",
  mediaUrl: "https://www.editionslibradiffusio.fr/841-large_default/les-trois-vies-de-suzana-baker.jpg",
  stock: 12,
  category: "Amour"
}, {
  title: "Le Rêve de Marie-Hélise",
  author: "Malroux Antonin",
  price: 24.5,
  publishingDate: "01/09/2021",
  description: "1908, dans un square d’Aurillac, Marie-Hélise, enfant de l’assistance, fait deux rencontres qui vont bouleverser sa vie : une gitane, allaitant au sein son nourrisson et, plus loin, un vieil homme, Pierre Destourbe, veuf qui a perdu son fils, avec son chien Padouille. Ce trio tisse des liens qui provoquent chez Pierre Destourbe une grande émotion. Mais cette complicité nouvelle va créer un certain malaise.",
  mediaUrl: "https://www.editionslibradiffusio.fr/839-large_default/le-reve-de-marie-helise.jpg",
  stock: 12,
  category: "Drame"
}, {
  title: "Intuitio",
  author: "Gounelle Laurent",
  price: 24.5,
  publishingDate: "01/09/2021",
  description: "Timothy, jeune auteur de polar, est interpellé par le FBI afin qu’il apporte son aide pour arrêter un dangereux criminel. D’abord dubitatif, il se laisse convaincre quand on l’invite à rejoindre un programme secret qui révèle et décuple les intuitions. Il se retrouve embarqué dans une course contre la montre qui le conduit à apprivoiser ce pouvoir méconnu mais accessible à tous, un pouvoir qui nous montre la vie telle qu’elle est véritablement : extraordinaire. Saurez-vous vous fier à vos propres intuitions pour résoudre l’enquête ?  ",
  mediaUrl: "https://www.editionslibradiffusio.fr/837-large_default/intuitio.jpg",
  stock: 12,
  category: "Fantastique",
  comments: [{
    avatar: "",
    firstname: "Anthony",
    lastname: "Manjarro",
    title: "Plutôt captivant...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, arcu non tempus volutpat, dolor dui posuere quam, sed porta ex massa sed leo. Quisque volutpat eros vitae mollis mattis. Suspendisse lobortis lacinia ipsum, semper varius ligula rutrum sit amet. Maecenas non luctus nunc. Maecenas a justo a tellus imperdiet luctus ac ut est. Sed vitae malesuada lorem. In erat nulla, convallis nec tellus id, vehicula rutrum nisl. Sed eget mauris nisl."
  }, {
    avatar: "",
    firstname: "Anthony",
    lastname: "Manjarro",
    title: "Plutôt captivant...",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, arcu non tempus volutpat, dolor dui posuere quam, sed porta ex massa sed leo. Quisque volutpat eros vitae mollis mattis. Suspendisse lobortis lacinia ipsum, semper varius ligula rutrum sit amet. Maecenas non luctus nunc. Maecenas a justo a tellus imperdiet luctus ac ut est. Sed vitae malesuada lorem. In erat nulla, convallis nec tellus id, vehicula rutrum nisl. Sed eget mauris nisl."
  }]
}, {
  title: "Le Mystère Soline * Au-delà du temps",
  author: "Dupuy Marie-Bernadette",
  price: 24.5,
  publishingDate: "01/09/2021",
  description: "Jeune femme volontaire, Soline est pisteuse-secouriste et maître-chien d’avalanche en Haute-Savoie. Animée par une farouche volonté d’indépendance, elle se consacre à son travail guidée par un don qui lui permet d’avoir des visions de personnes en péril. Mais une mystérieuse personne tente d’éloigner d’elle tous ceux qui lui témoignent de l’affection. Et si tout était lié à l’accident dont elle a été victime dans sa petite enfance, et qui l’a laissée sans aucun souvenir de ses origines ?",
  mediaUrl: "https://www.editionslibradiffusio.fr/838-large_default/le-mystere-soline-au-dela-du-temps.jpg",
  stock: 12,
  category: "Histoire"
}, {
  title: "Skidamarink",
  author: "Musso Guillaume",
  price: 24.5,
  publishingDate: "01/09/2021",
  description: "Alors que le vol de La Joconde fait la une de tous les journaux, quatre personnes qui ne se connaissent pas reçoivent un fragment découpé de la célèbre œuvre de Léonard de Vinci, accompagné d’un mystérieux rendez-vous dans une chapelle de Toscane. Pourquoi eux ? Qui les a choisis ? Ils l’ignorent encore, mais à l’instant même où ils décident de résoudre ensemble cette énigme, leur vie prend un tournant dangereux, exaltant et sans retour.",
  mediaUrl: "https://www.editionslibradiffusio.fr/702-large_default/skidamarink.jpg",
  stock: 12,
  category: "Amour"
}];
module.exports = products;