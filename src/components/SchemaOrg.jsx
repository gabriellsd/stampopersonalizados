import React, { useEffect } from 'react';
import { stampo, siteUrl } from '../data/site';

/**
 * Injeta JSON-LD para Organization (sempre) e opcionalmente para um Product.
 */
export function SchemaOrg({ product = null }) {
  useEffect(() => {
    const org = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: stampo.name,
      url: siteUrl,
      sameAs: [stampo.instagram].filter(Boolean),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'Portuguese',
        areaServed: 'BR',
      },
    };

    const scripts = [];
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.id = 'schema-org';
    orgScript.textContent = JSON.stringify(org);
    document.head.appendChild(orgScript);
    scripts.push(orgScript);

    if (product) {
      const productUrl = `${siteUrl}/#collection`;
      const imgFile = product.images?.[0] || product.image;
    const imageUrl = imgFile ? `${siteUrl}/products/${product.category}/${imgFile}` : undefined;
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.desc,
        url: productUrl,
        image: imageUrl,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'BRL',
        },
      };
      const prodScript = document.createElement('script');
      prodScript.type = 'application/ld+json';
      prodScript.id = 'schema-product';
      prodScript.textContent = JSON.stringify(productSchema);
      document.head.appendChild(prodScript);
      scripts.push(prodScript);
    }

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [product?.id]);
  return null;
}
