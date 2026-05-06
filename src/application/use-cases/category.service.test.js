import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import CategoryService from '../../../application/use-cases/category.service.js';

const mockCategoryRepository = {
    save: jest.fn(),
};

describe('CategoryService - Pruebas Unitarias', () => {
    let categoryService;

    beforeEach(() => {
        jest.clearAllMocks();
        categoryService = new CategoryService(mockCategoryRepository);
    });

    test('Crear: deberia crear y guardar una categoria correctamente', async () => {
        const data = { name: 'tareas', userId: 'user_123' };
        mockCategoryRepository.save.mockResolvedValue({ id: 1, ...data });

        const result = await categoryService.createCategory(data);

        expect(mockCategoryRepository.save).toHaveBeenCalledTimes(1);
        expect(result.name).toBe('tareas');
    });
});