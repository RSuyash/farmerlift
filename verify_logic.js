
const { getProductById } = require('./lib/cms.ts');

// Mock fetch globally
global.fetch = async (url) => {
    if (url.includes('/product?slug=npk-19-19-19')) {
        return {
            json: async () => ([{
                id: 318,
                title: { rendered: 'Test Product' },
                content: { rendered: 'Desc' },
                acf: {
                    rec_crop_1_name: 'Tomato',
                    rec_crop_1_img: 101, // ID instead of URL
                    rec_crop_2_name: 'Brinjal',
                    rec_crop_2_img: 'https://example.com/brinjal.png', // URL
                }
            }])
        };
    }
    if (url.includes('/media?include=101')) {
        return {
            json: async () => ([
                { id: 101, source_url: 'https://example.com/resolved-tomato.png' }
            ])
        };
    }
    return { json: async () => [] };
};

// Mock Next.js cache
jest.mock('next/cache', () => ({ revalidateTag: jest.fn() }));

// We need to run this in TS environment or Transpile.
// Actually, running `ts-node` might be easier if available, or just manually checking the logic.
// Since I can't easily run ts-node on the user's machine without knowing setup, I will rely on reading the code again or trying to run a simple js version of the logic logic in node.
