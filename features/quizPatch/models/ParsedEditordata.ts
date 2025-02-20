export type ParsedEditordata =
    | {
          id: string;
          type: 'paragraph';
          data: {
              text: string;
          };
      }
    | {
          id: string;
          type: 'code';
          data: {
              code: string;
          };
      };
