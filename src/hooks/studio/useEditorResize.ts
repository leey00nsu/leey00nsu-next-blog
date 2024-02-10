const useEditorResize = () => {
  // 에디터 높이를 source에 맞게 자동 조절
  const resizeEditor = () => {
    const editorElement = document.querySelector('#editor');
    const editorContentElement = document.querySelector('.w-md-editor-area');
    const textareaElement = document.querySelector('.w-md-editor-text-input');

    if (!editorElement || !textareaElement || !editorContentElement) return;

    const currentScrollTop = editorContentElement.scrollTop;

    textareaElement.setAttribute('style', 'height: auto');

    textareaElement.setAttribute(
      'style',
      `height: ${textareaElement.scrollHeight}px !important;
        min-height: 400px !important;
        -webkit-text-fill-color: inherit !important;`,
    );

    editorElement.setAttribute(
      'style',
      `max-height: 1000px !important;
        height: ${textareaElement.scrollHeight + 32}px !important;`,
    );

    editorContentElement.scrollTo(0, currentScrollTop);
  };

  return { resizeEditor };
};

export default useEditorResize;
