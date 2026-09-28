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

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1621996346565-e3d5d6281895?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
];

export const RecipeFormModal: React.FC = () => {
  const { isRecipeFormOpen, editingRecipe, closeRecipeForm, addRecipe, updateRecipe } = useApp();

  const [title, setTitle] = useState('');
  const [prepTime, setPrepTime] = useState<number>(15);
  const [costLevel, setCostLevel] = useState<CostLevel>(1);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedTags, setSelectedTags] = useState<DietTag[]>(['Budget']);
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);

  useEffect(() => {
    if (editingRecipe) {
      setTitle(editingRecipe.title);
      setPrepTime(editingRecipe.prep_time_minutes);
      setCostLevel(editingRecipe.cost_level);
      setImageUrl(editingRecipe.image_url);
      setSelectedTags(editingRecipe.diet_tags);
      setIngredients(editingRecipe.ingredients.length > 0 ? editingRecipe.ingredients : ['']);
      setSteps(editingRecipe.steps.length > 0 ? editingRecipe.steps : ['']);
    } else {
      setTitle('');
      setPrepTime(15);
      setCostLevel(1);
      setImageUrl(PRESET_IMAGES[0]);
      setSelectedTags(['Budget']);
      setIngredients(['']);
      setSteps(['']);
    }
  }, [editingRecipe, isRecipeFormOpen]);

  if (!isRecipeFormOpen) return null;

  const toggleTag = (tag: DietTag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredientField = () => {
    setIngredients(prev => [...prev, '']);
  };

  const removeIngredientField = (index: number) => {
    if (ingredients.length === 1) return;
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleStepChange = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const addStepField = () => {
    setSteps(prev => [...prev, '']);
  };

  const removeStepField = (index: number) => {
    if (steps.length === 1) return;
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedIngredients = ingredients.map(i => i.trim()).filter(Boolean);
    const cleanedSteps = steps.map(s => s.trim()).filter(Boolean);

    if (!title.trim()) return alert('Please enter a recipe title');
    if (cleanedIngredients.length === 0) return alert('Please add at least 1 ingredient');
    if (cleanedSteps.length === 0) return alert('Please add at least 1 instruction step');

    const finalImage = imageUrl.trim() || PRESET_IMAGES[0];

    if (editingRecipe) {
      updateRecipe({
        ...editingRecipe,
        title: title.trim(),
        prep_time_minutes: Number(prepTime),
        cost_level: costLevel,
        image_url: finalImage,
        diet_tags: selectedTags,
        ingredients: cleanedIngredients,
        steps: cleanedSteps
      });
    } else {
      addRecipe({
        title: title.trim(),
        prep_time_minutes: Number(prepTime),
        cost_level: costLevel,
        image_url: finalImage,
        diet_tags: selectedTags,
        ingredients: cleanedIngredients,
        steps: cleanedSteps,
        is_user_submitted: true
      });
    }
  };

  return (
    <div
      onClick={closeRecipeForm}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ChefHat className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-100">
              {editingRecipe ? 'Edit Recipe' : 'Add New Student Recipe'}
            </h3>
          </div>
          <button
            onClick={closeRecipeForm}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Scroll Area */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Title */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Recipe Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 10-Minute Garlic Butter Pasta"
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Time & Cost Level Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Prep Time (minutes) *
              </label>
              <input
                type="number"
                min="1"
                max="180"
                required
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Cost Level *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setCostLevel(level as CostLevel)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      costLevel === level
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {'$'.repeat(level)} {level === 1 ? '(Cheap)' : level === 2 ? '(Medium)' : '(Splurge)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image URL & Presets */}
          <div>
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-1">
              <Image className="w-3.5 h-3.5 text-amber-400" /> Image Cover URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none mb-2"
            />

            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-semibold text-slate-500 shrink-0">Quick Presets:</span>
              {PRESET_IMAGES.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  onClick={() => setImageUrl(img)}
                  className={`w-9 h-9 rounded-lg object-cover cursor-pointer border-2 transition-all ${
                    imageUrl === img ? 'border-amber-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Diet Tags Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Dietary & Category Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {DIET_TAG_OPTIONS.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Ingredients List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300">Ingredients *</label>
              <button
                type="button"
                onClick={addIngredientField}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Ingredient
              </button>
            </div>
            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={ing}
                    onChange={(e) => handleIngredientChange(idx, e.target.value)}
                    placeholder={`Ingredient ${idx + 1} (e.g. 1 tbsp soy sauce)`}
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredientField(idx)}
                      className="p-2 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Steps List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300">Instructions / Steps *</label>
              <button
                type="button"
                onClick={addStepField}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>
            <div className="space-y-2">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center shrink-0 mt-1">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={step}
                    onChange={(e) => handleStepChange(idx, e.target.value)}
                    placeholder={`Step ${idx + 1} instructions...`}
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none resize-none"
                  />
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStepField(idx)}
                      className="p-2 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={closeRecipeForm}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-extrabold hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
            >
              {editingRecipe ? 'Save Changes' : 'Publish Recipe'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
