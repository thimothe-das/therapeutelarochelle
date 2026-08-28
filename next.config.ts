import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serveur autonome : `next build` emet alors `.next/standalone/server.js`,
  // qui n'embarque que les modules reellement atteints par le code. C'est ce
  // qui fait passer l'image de production de 1,26 Go a quelques centaines de Mo.
  //
  // Conditionne a une variable posee par le Dockerfile plutot qu'active en dur,
  // parce que `next start` refuse de demarrer quand `output` vaut "standalone".
  // Sans cette condition, la configuration et le mode de construction devraient
  // basculer dans le meme geste, et un retour arriere sur l'un casserait
  // l'autre.
  output: process.env.BUILD_STANDALONE === "1" ? "standalone" : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["administration.therapeutelarochelle.fr"],
  },
};

export default nextConfig;
