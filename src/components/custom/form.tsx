'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Create a form schema for validation
const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters.' })
    .max(55),
  content: z
    .string()
    .min(2, { message: 'Content must be at least 2 characters.' }),
});

// Create a type from the schema
export type FormData = z.infer<typeof formSchema>;

// Create a form component
export function CreatePostForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      content: '',
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await action(data);
    reset();
  };

  // Render the form
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-4 my-4'
    >
      <div className='space-y-2 flex flex-col'>
        <label htmlFor='title' className='font-semibold'>
          Title
        </label>
        <input
          {...register('title')}
          id='title'
          placeholder='Enter the blog post title'
          maxLength={55}
          className='p-4 border rounded-md outline-2 outline-slate-800'
        />
        {errors.title && (
          <p role='alert' className='text-red-500 py-2'>
            {errors.title.message}
          </p>
        )}
      </div>

      <div className='space-y-2 flex flex-col'>
        <label htmlFor='content' className='font-semibold'>
          Content
        </label>
        <textarea
          {...register('content')}
          id='content'
          placeholder='Write your blog post content here'
          className='p-4 border rounded-md outline-2 outline-slate-800'
          rows={5}
        />
        {errors.content && (
          <p role='alert' className='text-red-500 py-2'>
            {errors.content.message}
          </p>
        )}
      </div>

      <button
        type='submit'
        className='w-full bg-slate-800 hover:bg-slate-950 text-white p-4 rounded-md'
      >
        Create Post
      </button>
    </form>
  );
}
