-- SEED DATA FOR PRODUCTS
-- Make sure you have at least one user in public."User" who is a seller (isSeller = true)
-- This script selects the first seller found to be the owner of these products.

WITH first_seller AS (
  SELECT id FROM public."User" WHERE "isSeller" = true LIMIT 1
)
INSERT INTO public."Product" (id, title, description, price, images, category, "createdAt", "updatedAt", "sellerId")
SELECT
  gen_random_uuid(),
  title,
  description,
  price,
  images,
  category,
  now(),
  now(),
  (SELECT id FROM first_seller)
FROM (VALUES
  -- Resin Art
  ('Ocean Waves Resin Tray', 'Beautiful serving tray with ocean wave effects created using high-quality epoxy resin.', 45.00, ARRAY['https://placehold.co/600x400/2563eb/ffffff?text=Resin+Tray'], 'Resin Art'),
  ('Floral Resin Coasters (Set of 4)', 'Handmade resin coasters with real pressed flowers encapsulated inside.', 25.50, ARRAY['https://placehold.co/600x400/db2777/ffffff?text=Floral+Coasters'], 'Resin Art'),
  ('Galaxy Resin Pendant', 'Unique necklace pendant featuring a swirling galaxy design.', 15.00, ARRAY['https://placehold.co/600x400/4c1d95/ffffff?text=Galaxy+Pendant'], 'Resin Art'),

  -- Crochet
  ('Handmade Crochet Amigurumi Bear', 'Cute stuffed bear toy, perfect for kids. Made with soft cotton yarn.', 30.00, ARRAY['https://placehold.co/600x400/d97706/ffffff?text=Crochet+Bear'], 'Crochet'),
  ('Boho Crochet Top', 'Stylish summer crop top with intricate lace patterns.', 35.00, ARRAY['https://placehold.co/600x400/f59e0b/ffffff?text=Crochet+Top'], 'Crochet'),
  ('Cozy Granny Square Blanket', 'Traditional granny square blanket in vibrant colors. 60x60 inches.', 80.00, ARRAY['https://placehold.co/600x400/10b981/ffffff?text=Granny+Square+Blanket'], 'Crochet'),

  -- Paintings
  ('Sunset over Lahore - Oil on Canvas', 'Original oil painting capturing the vibrant colors of a Lahore sunset.', 150.00, ARRAY['https://placehold.co/600x400/ea580c/ffffff?text=Sunset+Painting'], 'Paintings'),
  ('Abstract Geometric Acrylic', 'Modern abstract art piece with bold geometric shapes and textures.', 95.00, ARRAY['https://placehold.co/600x400/0ea5e9/ffffff?text=Abstract+Art'], 'Paintings'),
  ('Watercolour Floral Composition', 'Delicate watercolor painting of spring flowers.', 40.00, ARRAY['https://placehold.co/600x400/ec4899/ffffff?text=Watercolor+Flowers'], 'Paintings'),

  -- Pottery
  ('Hand-thrown Ceramic Mug', 'Earthy toned ceramic coffee mug, glazed by hand.', 20.00, ARRAY['https://placehold.co/600x400/78350f/ffffff?text=Ceramic+Mug'], 'Pottery'),
  ('Blue Glazed Flower Vase', 'Tall vase with a stunning cobalt blue drip glaze.', 55.00, ARRAY['https://placehold.co/600x400/1e3a8a/ffffff?text=Blue+Vase'], 'Pottery'),
  ('Traditional Clay Cooking Pot', 'Authentic terracotta cooking pot, perfect for slow cooking.', 30.00, ARRAY['https://placehold.co/600x400/92400e/ffffff?text=Clay+Pot'], 'Pottery')

) AS data(title, description, price, images, category);
