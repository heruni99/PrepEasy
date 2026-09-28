import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image, Clock, DollarSign, ChefHat } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { CostLevel, DietTag } from '../types';

const DIET_TAG_OPTIONS: DietTag[] = [
  'Vegan',
  'Vegetarian',
  'High Protein',
  'Quick (<15m)',
  'Budget',
  'One-Pot',
  'Gluten-Free',
  'Dairy-Free',
  'Meal Prep',
  'Halal'
];

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
];

export const RecipeFormModal: React.FC = () => {
  const { isRecipeFormOpen, editingRecipe, closeRecipeForm, addRecipe, updateRecipe, addToast } = useApp();

  const [title, setTitle] = useState('');
  const [prepTime, setPrepTime] = useState(15);
  const [costLevel, setCostLevel] = useState<CostLevel>(1);
  const [imageUrl, setImageUrl] = useState(SAMPLE_IMAGES[0]);
  const [dietTags, setDietTags] = useState<DietTag[]>(['Budget']);
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);

  useEffect(() => {
    if (editingRecipe) {
      setTitle(editingRecipe.title);
      setPrepTime(editingRecipe.prep_time_minutes);
      setCostLevel(editingRecipe.cost_level);
      setImageUrl(editingRecipe.image_url);
      setDietTags(editingRecipe.diet_tags);
      setIngredients(editingRecipe.ingredients);
      setSteps(editingRecipe.steps);
    } else {
      setTitle('');
      setPrepTime(15);
      setCostLevel(1);
      setImageUrl(SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)]);
      setDietTags(['Budget']);
      setIngredients(['']);
      setSteps(['']);
    }
  }, [editingRecipe, isRecipeFormOpen]);

  if (!isRecipeFormOpen) return null;

  const handleTagToggle = (tag: DietTag) => {
    setDietTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleIngredientChange = (index: number, val: string) => {
    const updated = [...ingredients];
    updated[index] = val;
    setIngredients(updated);
  };

  const addIngredientField = () => setIngredients(prev => [...prev, '']);
  const removeIngredientField = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleStepChange = (index: number, val: string) => {
    const updated = [...steps];
    updated[index] = val;
    setSteps(updated);
  };

  const addStepField = () => setSteps(prev => [...prev, '']);
  const removeStepField = (index: number) => {
    if (steps.length > 1) {
      setSteps(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanIngredients = ingredients.map(i => i.trim()).filter(Boolean);
    const cleanSteps = steps.map(s => s.trim()).filter(Boolean);

    if (!title.trim() || cleanIngredients.length === 0 || cleanSteps.length === 0) {
      addToast('Please fill in title, at least 1 ingredient, and 1 instruction step!', 'warning');
      return;
    }

    const payload = {
      title: title.trim(),
      prep_time_minutes: Number(prepTime),
      cost_level: costLevel,
      image_url: imageUrl,
      diet_tags: dietTags,
      ingredients: cleanIngredients,
      steps: cleanSteps,
      is_user_submitted: true
    };

    if (editingRecipe) {
      await updateRecipe({ ...payload, id: editingRecipe.id, owner_id: editingRecipe.owner_id });
      addToast(`Updated "${title}"!`, 'success');
    } else {
      await addRecipe(payload);
      addToast(`Created recipe "${title}"!`, 'success');
    }

    closeRecipeForm();
  };

  return (
    <div
      onClick={closeRecipeForm}
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFDF9] border-2 border-stone-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1C1917] relative text-stone-900 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={closeRecipeForm}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#F8F3EB] border-2 border-stone-900 text-stone-800 hover:bg-[#FF3B30] hover:text-white transition-all shadow-[2px_2px_0px_0px_#1C1917]"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-2xl bg-[#FF3B30] text-white flex items-center justify-center border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917]">
            <ChefHat className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-stone-900 font-heading">
              {editingRecipe ? 'Edit Student Recipe' : 'Add New Student Recipe'}
            </h3>
            <p className="text-xs text-stone-600 font-bold">
              Share your dorm hack, 1-pot dish, or budget creation
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Title Input */}
          <div>
            <label className="text-xs font-black text-stone-900 block mb-1">Recipe Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 10-Minute Garlic Butter Pasta"
              className="w-full bg-[#F8F3EB] border-2 border-stone-900 focus:border-[#FF3B30] rounded-2xl px-3.5 py-2.5 text-xs text-stone-900 font-bold placeholder-stone-500 focus:outline-none shadow-[2px_2px_0px_0px_#1C1917]"
            />
          </div>

          {/* Prep Time & Budget Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="text-xs font-black text-stone-900 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-stone-700" />
                <span>Prep Time (minutes) *</span>
              </label>
              <input
                type="number"
                min={1}
                max={120}
                required
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full bg-[#F8F3EB] border-2 border-stone-900 focus:border-[#FF3B30] rounded-2xl px-3.5 py-2.5 text-xs text-stone-900 font-bold focus:outline-none shadow-[2px_2px_0px_0px_#1C1917]"
              />
            </div>

            <div>
              <label className="text-xs font-black text-stone-900 flex items-center gap-1 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                <span>Cost Level *</span>
              </label>
              <div className="flex bg-[#F8F3EB] p-1 rounded-2xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917]">
                {([1, 2, 3] as CostLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setCostLevel(lvl)}
                    className={`flex-1 py-1 rounded-xl text-xs font-black transition-all ${
                      costLevel === lvl
                        ? 'bg-[#06D6A0] text-stone-950 border border-stone-900 shadow-[1px_1px_0px_0px_#1C1917]'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    {'$'.repeat(lvl)} ({lvl === 1 ? 'Cheap' : lvl === 2 ? 'Medium' : 'Splurge'})
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Image Presets Selector */}
          <div>
            <label className="text-xs font-black text-stone-900 flex items-center gap-1 mb-1">
              <Image className="w-3.5 h-3.5 text-stone-700" />
              <span>Image Cover URL</span>
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#F8F3EB] border-2 border-stone-900 focus:border-[#FF3B30] rounded-2xl px-3.5 py-2 text-xs text-stone-900 font-bold focus:outline-none shadow-[2px_2px_0px_0px_#1C1917] mb-2"
            />
            
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              <span className="text-[10px] font-extrabold text-stone-500 shrink-0">Presets:</span>
              {SAMPLE_IMAGES.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preset ${idx}`}
                  onClick={() => setImageUrl(img)}
                  className={`w-9 h-9 rounded-xl object-cover border-2 cursor-pointer transition-all shrink-0 ${
                    imageUrl === img ? 'border-[#FF3B30] scale-110 shadow-[2px_2px_0px_0px_#1C1917]' : 'border-stone-900 opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Dietary Tags Pill Selection */}
          <div>
            <label className="text-xs font-black text-stone-900 block mb-1">Dietary & Category Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {DIET_TAG_OPTIONS.map(tag => {
                const isSelected = dietTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition-all border-2 border-stone-900 ${
                      isSelected
                        ? 'bg-[#FF3B30] text-white shadow-[2px_2px_0px_0px_#1C1917]'
                        : 'bg-[#F8F3EB] text-stone-800 hover:bg-stone-200'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Ingredients Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-stone-900">Ingredients *</label>
              <button
                type="button"
                onClick={addIngredientField}
                className="text-xs font-black text-[#FF3B30] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Ingredient</span>
              </button>
            </div>

            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  required
                  value={ing}
                  onChange={(e) => handleIngredientChange(idx, e.target.value)}
                  placeholder={`Ingredient ${idx + 1} (e.g. 1 tbsp soy sauce)`}
                  className="flex-1 bg-[#F8F3EB] border-2 border-stone-900 focus:border-[#FF3B30] rounded-2xl px-3 py-1.5 text-xs text-stone-900 font-bold focus:outline-none shadow-[2px_2px_0px_0px_#1C1917]"
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredientField(idx)}
                    className="p-1.5 rounded-xl bg-rose-100 border border-stone-900 text-rose-700 hover:bg-rose-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Dynamic Steps Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-stone-900">Instructions / Steps *</label>
              <button
                type="button"
                onClick={addStepField}
                className="text-xs font-black text-[#FF3B30] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#FF3B30] text-white text-[10px] font-black flex items-center justify-center shrink-0 border border-stone-900">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  required
                  value={step}
                  onChange={(e) => handleStepChange(idx, e.target.value)}
                  placeholder={`Step ${idx + 1} instructions...`}
                  className="flex-1 bg-[#F8F3EB] border-2 border-stone-900 focus:border-[#FF3B30] rounded-2xl px-3 py-1.5 text-xs text-stone-900 font-bold focus:outline-none shadow-[2px_2px_0px_0px_#1C1917]"
                />
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStepField(idx)}
                    className="p-1.5 rounded-xl bg-rose-100 border border-stone-900 text-rose-700 hover:bg-rose-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#FF3B30] text-white font-extrabold text-xs border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1C1917] hover:bg-[#E6302B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all uppercase tracking-wider"
          >
            {editingRecipe ? 'Update Recipe' : 'Save & Publish Recipe'}
          </button>

        </form>
      </div>
    </div>
  );
};
